import express from "express";
import cors from "cors";
import ProductHandler from "./models/Products.js";
import { getDate } from "./utils/getActualDate.js";

const router = express.Router();

const app = express();
const port = 8080;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", router);

const products_handler = new ProductHandler();

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

router.get("/", async (req, res) => {
  const products = await products_handler.getAll();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const error_message = { error: "producto no encontrado" };
  const product =
    (await products_handler.getById(req.params.id)) || error_message;
  res.send(product);
});

router.post("/", async (req, res) => {
  try {
    const id = await products_handler.addProduct(req.body);
    console.log(
      `${getDate()} [SUCCESS] Producto con id ${id} agregado con éxito`
    );
    res.json({
      result: "ok",
      message: "Producto agregado con éxito",
      id: id,
    });
  } catch (e) {
    console.log(e);
  }
});

// revisar
router.put("/:id", async (req, res) => {
  try {
    await products_handler.update(req.params.id, req.body);
    res.json({
      result: "ok",
      message: `Producto ${req.params.id} actualizado correctamente`,
    });
  } catch (e) {
    console.log(e);
  }
});

router.delete("/:id", async (req, res) => {
  await products_handler.deleteById(req.params.id);
  res.json({
    result: "ok",
    message: "producto eliminado exitosamente",
  });
});
