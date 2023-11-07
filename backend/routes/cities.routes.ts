import { Router } from 'express-serve-static-core';
import cities from '../controllers/cities.controller'
import express  from 'express'

const baseURL = "/cities"

export default (app: { use: (arg0: string, arg1: Router) => void }) => {

const router = express.Router()

 router.get(baseURL, cities.findAll);

 router.put(baseURL, cities.update);

 router.delete(baseURL, cities.delete);


 app.use("/api", router);
};
