const { databaseWritable } = require("../util/writable");
const { connectDb } = require("../db");

const connection = connectDb({
  host: "localhost",
  port: "5432",
  user: "root",
  password: "qwerty",
  database: "tweets",
});

const postgresWriteStream = databaseWritable(connection);

const { userMap, userWrite, userFormat } = require("./user");
const { tweetHashtagWrite } = require("./tweetHashtag");
const { hashtagWrite } = require("./hashtag");
const { countryWrite, countryQuery } = require("./country");
const { tweetMap, tweetWrite, tweetFormat } = require("./tweet");
const { stateMap, storeState } = require("./statefull");
const { tweetMentionsWrite, formatTweetMentions } = require("./tweetMentions");

module.exports = {
  tweetMentionsPostgresWriteStream: postgresWriteStream(tweetMentionsWrite),
  tweetHashtagPostgresWriteStream: postgresWriteStream(tweetHashtagWrite),
  hashtagsPostgresWriteStream: postgresWriteStream(hashtagWrite),
  countriesPostgresWriteStream: postgresWriteStream(countryWrite),
  tweetPostgresWriteStream: postgresWriteStream(tweetWrite),
  userPostgresWriteStream: postgresWriteStream(userWrite),
  tweetMap,
  emptyArrayFilter: require("./empty"),
  userMap,
  stateMap,
  storeState,
  tweetFormat,
  userFormat,
  formatTweetMentions
};
