const state = require("./state/state.original.json");
const { Readable } = require("stream");
const format = require("pg-format");
const { map } = require("./util/transforms");
const BatchStream = require("batch-stream");

// const { hashtagsPostgresWriteStream } = require("./streams");

// Readable.from(Object.entries(state.hashtagMap))
//   .pipe(map(([value, hashtag_id]) => format("(%L)", [hashtag_id, value])))
//   .pipe(new BatchStream({ size: 100000 }))
//   .pipe(hashtagsPostgresWriteStream)


