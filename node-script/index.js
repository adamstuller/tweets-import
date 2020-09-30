#!/usr/bin/env node
const ndjson = require("ndjson");
const { map, filter } = require("./util/transforms");
const fs = require("fs");
const yargs = require("yargs");
const unique = require("unique-stream");
const FlattenTransformer = require("flatten-stream");
const { exit, stdout } = require("process");
const format = require("pg-format");
const BatchStream = require("batch-stream");

const {
  tweetMentionsPostgresWriteStream,
  tweetHashtagPostgresWriteStream,
  hashtagsPostgresWriteStream,
  countriesPostgresWriteStream,
  tweetPostgresWriteStream,
  userPostgresWriteStream,
  tweetMap,
  userMap,
  stateMap,
  storeState,
  tweetFormat,
  userFormat,
  formatTweetMentions,
} = require("./streams");

// Command line stuff
// eslint-disable-line
yargs
  .option("file", {
    alias: "f",
    type: "string",
    description: "File to be used as input file",
  })
  .option("table", {
    alias: "t",
    type: "string",
    description: "Table to be seeded",
  }).argv;

if (!fs.existsSync(yargs.argv.file)) {
  console.log("File does not exists!");
  process.exit(1);
}

const inputStream = fs
  // example: "/Users/adamstuller/Downloads/coronavirus-tweet-id-2020-08-01-02.jsonl",
  .createReadStream(yargs.argv.file)
  .pipe(ndjson.parse())
  .pipe(map(({ retweeted_status, ...rest }) => [retweeted_status, rest]))
  .pipe(new FlattenTransformer())
  .pipe(filter(tweet => tweet != null))
  .pipe(map(stateMap));


// Special case and final case... persisting state
inputStream.on("finish", storeState);
inputStream.on("error", console.error);

inputStream
  .pipe(map(({ users }) => users))
  .pipe(new FlattenTransformer())
  .pipe(map(userMap))
  .pipe(filter(({ id }) => id != null))
  .pipe(map(userFormat))
  .pipe(new BatchStream({ size: 100000 }))
  .pipe(userPostgresWriteStream)
  .on("finish", () => console.log("ACCOUNTS INSERTED!"));

inputStream
  .pipe(map(tweetMap))
  .pipe(map(tweetFormat))
  .pipe(new BatchStream({ size: 100000 }))
  .pipe(tweetPostgresWriteStream)
  .on("finish", () => console.log("TWEETS INSERTED!"));

inputStream
  .pipe(map(({ country }) => country))
  .pipe(unique("code"))
  .pipe(map(({ code, id }) => format("(%L)", [id, code])))
  .pipe(new BatchStream({ size: 100000 }))
  .pipe(countriesPostgresWriteStream)
  .on("finish", () => console.log("COUNTRIES INSERTED!"));

inputStream
  .pipe(map(({ hashtags }) => hashtags))
  .pipe(new FlattenTransformer())
  .pipe(unique("value"))
  .pipe(filter(({ hashtag_id }) => hashtag_id != null))
  .pipe(map(({ value, hashtag_id }) => format("(%L)", [hashtag_id, value])))
  .pipe(new BatchStream({ size: 100000 }))
  .pipe(hashtagsPostgresWriteStream)
  .on("finish", () => console.log("HASHTAGS INSERTED!"));

inputStream
  .pipe(map(({ hashtags }) => hashtags))
  .pipe(new FlattenTransformer())
  .pipe(
    map(({ hashtag_id, tweet_id }) => format("(%L)", [hashtag_id, tweet_id]))
  )
  .pipe(new BatchStream({ size: 100000 }))
  .pipe(tweetHashtagPostgresWriteStream)
  .on("finish", () => console.log("TWEET HASHTAGS INSERTED!"));

  inputStream
  .pipe(map(({ tweet_mentions }) => tweet_mentions))
  .pipe(new FlattenTransformer())
  .pipe(map(formatTweetMentions))
  .pipe(new BatchStream({ size: 100000 }))
  .pipe(tweetMentionsPostgresWriteStream)
  .on("finish", () => console.log("TWEET MENTIONS INSERTED!"));

