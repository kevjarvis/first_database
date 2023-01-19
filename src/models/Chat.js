import { SQLiteConnect } from "../utils/SQLiteConnect.js";
import { getDate } from "../utils/getActualDate.js";

class ChatHandler {
  _tablename = "chat";
  constructor() {
    this.db = new SQLiteConnect();
    // verificar si existe una tabla y la crea en caso de que no
    this.db.connection.schema
      .hasTable(this._tablename)
      .then((result) => {
        if (!result) {
          console.log(
            `${getDate()} [INFO] No existe la tabla ${this._tablename}`
          );
          this.db.connection.schema
            .createTable(this._tablename, (table) => {
              console.log(`${getDate()} [INFO] Creando tabla...`);
              table.increments("id");
              table.string("nombre");
              table.integer("mensaje");
              table.string("timestamp");
            })
            .then(() =>
              console.log(
                `${getDate()} [SUCCESS] Tabla ${this._tablename} creada`
              )
            );
        }
      })
      .finally(() => {
        console.log(
          `${getDate()} [SUCCESS] Base de datos conectada exitosamente`
        );
      });
  }

  async addMessage(message_object) {
    try {
      return this.db.connection(this._tablename).insert(message_object);
    } catch (e) {
      console.log(e);
    }
  }

  async getMessageById(id) {
    try {
      return await this.db.connection(this._tablename).where({ id }).first();
    } catch (e) {
      console.log(e);
    }
  }

  async getAllMessages() {
    try {
      return await this.db.connection(this._tablename).select();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteMessage(id) {
    try {
      await this.db.connection(this._tablename).where({ id }).del();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteAllMessages() {
    try {
      await this.db.connection(this._tablename).select().del();
    } catch (e) {
      console.log(e);
    }
  }
}

export default ChatHandler;
