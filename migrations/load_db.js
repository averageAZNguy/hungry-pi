require('dotenv').config()
const { Client } = require('pg')

// psql -c "COPY tbname FROM '/tmp/the_file.csv' delimiter '|' csv;"
console.log(process.env.PASSWORD)
const client = new Client({
  user: process.env.USER,
  host: 'localhost',
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.PORT,
})
client.connect()
 
client.query('SELECT * FROM personal_pizza', (err, res) => {
  console.log(err, res)
  console.log('here')
  client.end()
})