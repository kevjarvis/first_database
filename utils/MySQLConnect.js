import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import knex0 from "knex";

const _CONFIG = {
  client: "mysql",
  connection: {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  pool: { min: 0, max: 10 },
};

export class MYSQLDatabase {
  constructor() {
    this.connection = knex0(_CONFIG);
  }
}
