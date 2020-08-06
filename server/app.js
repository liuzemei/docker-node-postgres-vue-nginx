const app = require('express')()
const { Pool } = require('pg')

const pool = new Pool({
  host: 'postgres',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres'
})

const query = async (sql, params) => {
  let client = await pool.connect()
  try {
    let { rows } = await client.query(sql, params)
    return rows
  } finally {
    await client.release()
  }
};

(async () => {
  await query(`
CREATE TABLE IF NOT EXISTS timer (
  times  INTEGER NOT NULL DEFAULT 0
);`)
})()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.get("/api/test", async (req, res) => {
  let timer = (await query(`SELECT times FROM timer`))[0]
  if (timer) {
    await query(`UPDATE timer SET times=$1`, [++timer.times])
  } else {
    await query(`INSERT INTO timer(times) VALUES(0)`)
  }
  res.json({ data: timer.times })
})

app.listen(3000)
