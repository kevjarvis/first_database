import knex0 from "knex";
import path from "path";

const _CONFIG = {
  client: "sqlite3",
  connection: { filename: path.resolve() + "/DB/ecommerce.sqlite" },
  useNullAsDefault: true,
};

export class SQLiteConnect {
  constructor() {
    this.connection = knex0(_CONFIG);
  }
}
