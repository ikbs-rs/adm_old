import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

pool.connect((err) => {
    if(err) {
        console.log(err)
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

export default pool.promise();
