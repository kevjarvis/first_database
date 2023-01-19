import { MYSQLDatabase } from "../utils/MySQLConnect.js";
import { getDate } from "../utils/getActualDate.js";

class ProductHandler {
  _tablename = "products";
  constructor() {
    this.db = new MYSQLDatabase();
    // verificar si existe una tabla y la crea en caso de que no
    this.db.connection.schema.hasTable(this._tablename).then((result) => {
      if (!result) {
        console.log(
          `${getDate()} [INFO] No existe la tabla ${this._tablename}`
        );
        this.db.connection.schema
          .createTable(this._tablename, (table) => {
            console.log(`${getDate()} [INFO] Creando tabla...`);
            table.increments("id");
            table.string("nombre");
            table.integer("precio");
            table.string("thumbnail");
          })
          .then(() =>
            console.log(
              `${getDate()} [SUCCESS] Tabla ${this._tablename} creada`
            )
          );
      }
    });
  }

  async addProduct(product_object) {
    try {
      return this.db.connection(this._tablename).insert(product_object);
    } catch (e) {
      console.log(e);
    }
  }

  async update(id, updated_product) {
    try {
      return this.db
        .connection(this._tablename)
        .where({ id })
        .update(updated_product);
    } catch (e) {
      console.log(e);
    }
  }

  async getById(id) {
    try {
      return await this.db.connection(this._tablename).where({ id }).first();
    } catch (e) {
      console.log(e);
    }
  }

  async getAll() {
    try {
      return await this.db.connection(this._tablename).select();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteById(id) {
    try {
      await this.db.connection(this._tablename).where({ id }).del();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteAll() {
    try {
      await this.db.connection(this._tablename).select().del();
    } catch (e) {
      console.log(e);
    }
  }
}

export default ProductHandler;
