import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/cities.routes'
import db from "./models";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(cors());



app.use(cors({
  origin: 'http://localhost:5173', 
}));


db.sequelize.sync({
  force: true
})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err: { message: string; }) => {
    console.log("Failed to sync db: " + err.message);
  });

  routes(app);


  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
  
  