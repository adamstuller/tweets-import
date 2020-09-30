const format = require("pg-format");

const userMap = ({
  id,
  screen_name,
  name,
  description,
  followers_count,
  friends_count,
  statuses_count,
}) => ({
  id,
  screen_name,
  name,
  description,
  followers_count,
  friends_count,
  statuses_count,
});

const userFormat = ({
  id,
  screen_name,
  name,
  description,
  followers_count,
  friends_count,
  statuses_count,
}) =>
  format("(%L)", [
    id,
    screen_name,
    name,
    description,
    followers_count,
    friends_count,
    statuses_count,
  ]);

const userWrite = (client, accounts) => {
  console.log(`INSERTING ${accounts.length} accounts`);

  const queryString = `INSERT INTO accounts (id,screen_name,name,description,followers_count,friends_count,statuses_count)
      VALUES ${accounts.join(", ")}
      ON CONFLICT (id) DO NOTHING`;

  return client.query(queryString);
};

module.exports = {
  userMap,
  userWrite,
  userFormat,
};
