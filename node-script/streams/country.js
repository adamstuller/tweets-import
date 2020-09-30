// const countryWrite = (client, country) => {
//   const queryString = `INSERT INTO countries (id, code) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING;`;
//   return client.query(queryString, [country.id, country.code]);
// };

const countryWrite = (client, countries) => {
  const queryString = `INSERT INTO countries (id, code, name) VALUES ${countries.join(",")} ON CONFLICT (id) DO NOTHING;`
  console.log(`INSERTING ${countries.length} COUNTRIES`)
  return client.query(queryString);
};


module.exports = { countryWrite };
