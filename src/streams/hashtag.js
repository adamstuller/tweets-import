const hashtagWrite = (client, hashtags) => {
  const queryString = `INSERT INTO hashtags (id, value) VALUES ${hashtags.join(
    ", "
  )} ON CONFLICT (id) DO NOTHING;`;
  console.log(`INSERTING ${hashtags.length} HASHTAGS`)
  return client.query(queryString);
};

module.exports = { hashtagWrite };
