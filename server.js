import express from 'express'
import routes from './api/route/signupRoute'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const app = express()
const PORT = 3001

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/project1')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

routes(app)

app.listen(PORT, () => {
  console.log(`you are server is running on ${PORT}`);
})