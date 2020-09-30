const { Client } = require("pg");

const connectDb = async ({ host, port, user, password, database }) => {
  const client = new Client({
    host,
    port,
    user,
    password,
    database,
  });

  try {
    await client.connect();
    return client;
  } catch (error) {
    console.error("connection error", error);
    process.exit(1);
  }
};

module.exports = {
  connectDb,
};
