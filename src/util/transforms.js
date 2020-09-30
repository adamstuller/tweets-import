const { Transform } = require("stream");

const map = fn => {
  return new Transform({
    objectMode: true,
    transform(ch, e, cb) {
      this.push(fn(ch));
      cb();
    }
  });
};

const filter = fn => {
  return new Transform({
    objectMode: true,
    transform(ch, e, cb) {
      fn(ch) && this.push(ch);
      cb();
    }
  });
};

module.exports = {
  map,
  filter
};
