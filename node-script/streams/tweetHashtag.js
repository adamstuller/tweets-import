const tweetHashtagWrite = (client, tweet_hashtags) => {
  const queryString = `INSERT INTO tweet_hashtags (hashtag_id, tweet_id) VALUES ${tweet_hashtags.join(
    ", "
  )} ON CONFLICT (hashtag_id, tweet_id) DO NOTHING;`;

  console.log(`INSERTING ${tweet_hashtags.length} TWEET HASHTAGS`)
  return client.query(queryString);
};

module.exports = { tweetHashtagWrite };
