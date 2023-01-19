import express from "express";
import handlebars from "express-handlebars";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import request from "request";
import path from "path";
import ChatHandler from "./models/Chat.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
io.serveClient(true);

const chatDB = new ChatHandler();

const currentDir = path.resolve();
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutDir: currentDir + "\\views\\layouts",
    partialsDir: currentDir + "\\views\\partials",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("main");
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor inicializado en el puerto ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("usuario conectado");

  //primer renderizado

  let options = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    url: "http://127.0.0.1:8080/api/productos",
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    socket.emit("server:update-products", response.body);
  });

  socket.emit("server:update-products");

  socket.on("client:product-added", (product_data) => {
    // envia la info del producto a todos los sockets conectados
    io.sockets.emit("server:product-added", product_data);
  });

  socket.on("client:refresh-messages", () => {
    chatDB.getAllMessages().then((messages) => {
      socket.emit("server:refresh-messages", messages);
    });
  });

  socket.on("client:new-message", (data) => {
    io.sockets.emit("server:new-message", data);
    chatDB.addMessage(data);
  });
});
