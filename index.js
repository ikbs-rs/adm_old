import express  from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './src/routes/index.js' 

const app = express()
dotenv.config()
app.use(cors())

app.use(router) // prosleđivanje zahteva preko rutera

const appPort = process.env.APP_PORT 
app.listen(appPort||3000, () => {
  console.log(`Server je pokrenut na adresi ${appPort}`)
})