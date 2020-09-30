const fs = require("fs");

const STATE_FILE =
  "/Users/adamstuller/Skolicka/Semester7/PDT/tweets/src/state/state.json";

const state = require(STATE_FILE);

const storeState = () => {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state));
};

const stateMap = ({
  full_text,
  retweet_count,
  favorite_count,
  created_at,
  user,
  retweeted_status,
  coordinates,
  id,
  entities,
  place,
}) => {
  let country ;
  if (place != null && place.country_code != null) {
    if (state.countryMap[place.country_code] == null) {
      state.countryMap[place.country_code] = state.countryId;
      state.countryId += 1;
    }

    country = {
      id: state.countryMap[place.country_code],
      code: place.country_code,
      name: place.country,
    };
  }
  const currHashtags = [];
  if (entities != null && entities.hashtags != null) {
    entities.hashtags.forEach(({ text }) => {
      if (state.hashtagMap[text] == null) {
        state.hashtagMap[text] = state.hashtagId;
        state.hashtagId += 1;
      }
      currHashtags.push({
        value: text,
        hashtag_id: state.hashtagMap[text],
        tweet_id: id,
      });
    });
  }

  const users = [user];

  let tweet_mentions;
  if (entities != null && entities.user_mentions != null) {
    tweet_mentions = entities.user_mentions.map((account) => ({
      account_id: account.id,
      tweet_id: id,
    }));

    entities.user_mentions.forEach(({ screen_name, name, id }) => {
      users.push({ screen_name, name, id });
    });
  }
  let parent_id;
  if (retweeted_status != null) {
    parent_id = retweeted_status.id;
  }

  return {
    id,
    content: full_text,
    retweet_count,
    favorite_count,
    happened_at: created_at,
    author_id: user.id,
    parent_id,
    country,
    hashtags: currHashtags || [],
    location: coordinates,
    user,
    users,
    tweet_mentions,
  };
};

module.exports = { stateMap, storeState };
