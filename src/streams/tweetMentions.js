const format = require("pg-format");
const tweetMentionsWrite = (client, tweet_mentions) => {
  const queryString = `INSERT INTO tweet_mentions (account_id, tweet_id) VALUES ${tweet_mentions.join(
    ", "
  )} ON CONFLICT (account_id, tweet_id) DO NOTHING;`;

  console.log(`INSERTING ${tweet_mentions.length} TWEET MENTIONS`);
  return client.query(queryString);
};

const formatTweetMentions = ({ account_id, tweet_id }) =>
  format("(%L)", [account_id, tweet_id]);

module.exports = {
  tweetMentionsWrite,
  formatTweetMentions
};
