const format = require("pg-format");

const tweetMap = ({
  id,
  content,
  location,
  retweet_count,
  favorite_count,
  happened_at,
  author_id,
  country,
  parent_id,
}) => ({
  id,
  content,
  location: location != null ? location.coordinates : null,
  retweet_count,
  favorite_count,
  happened_at,
  author_id,
  country_id: country.id,
  parent_id,
});

const tweetFormat = ({
  id,
  content,
  retweet_count,
  favorite_count,
  happened_at,
  author_id,
  parent_id,
  country_id,
  location,
}) => {
  let locationString = null;
  if (location != null) {
    locationString = `POINT(  ${location[0]} ${location[1]} )`;
  }

  return format(
    "( %L, %s, %L)",
    [id, content],
    [
      locationString != null
        ? ` st_geometryfromtext( '${locationString}' , 4326)`
        : "NULL",
    ],
    [
      retweet_count,
      favorite_count,
      happened_at,
      author_id,
      country_id,
      parent_id,
    ]
  );
};

const tweetWrite = (client, tweets) => {
  const queryString = `INSERT INTO tweets (id,content,location,retweet_count,favorite_count,happened_at,author_id, country_id, parent_id)
    VALUES ${tweets.join(", ")}
    ON CONFLICT (id) DO NOTHING;`;

    console.log(`INSERTING ${tweets.length} TWEETS`)
  return client.query(queryString);
};

module.exports = {
  tweetMap,
  tweetWrite,
  tweetFormat,
};
