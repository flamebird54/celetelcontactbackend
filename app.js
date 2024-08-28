var express = require('express');
import { mongoconnection } from "./db"
import bodyParser from 'body-parser';


var app = express();
import cors from 'cors'
import auth from './routes/apis'

mongoconnection();
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("server listining on 8000")
})

app.use("/api/user", auth);

export default app
