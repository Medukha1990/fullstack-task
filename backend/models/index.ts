import {Sequelize} from "sequelize";
import cityModel from './cities.model'

import dbConfig = require('../config/config.json')

const sequelize = new Sequelize(dbConfig.development.DB, dbConfig.development.username, dbConfig.development.password, {
  host: dbConfig.development.host,
  dialect: "postgres",
  define: {
    timestamps: false
  },
  pool: {
    max: dbConfig.development.pool.max,
    min: dbConfig.development.pool.min,
    acquire: dbConfig.development.pool.acquire,
    idle: dbConfig.development.pool.idle,
  },
});

const db = {} as any;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cities = cityModel(sequelize, Sequelize);

export default db;
