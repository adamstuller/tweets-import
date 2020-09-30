const { Writable } = require("stream");

const databaseWritable = (clientPromise) => (writeFn) =>
  new Writable({
    objectMode: true,
    write(chunk, encoding, callback) {
      clientPromise
        .then((client) => {
          const query =  writeFn(client, chunk);
        //   console.log(query)
          return query
        })
        .then(result => {
            // console.log(result)
            callback()
        })
        .catch((error) => {
          console.log(error);
          callback(error);
        });
    },
  });

module.exports = {
  databaseWritable,
};


