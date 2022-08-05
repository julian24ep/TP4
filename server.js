const { Console } = require("console");
const fs = require("fs");
const express = require("express");
const Conteiner = require("./Conteiner");
const exp = require("constants");

const conteiner = new Conteiner("./Trabajo.txt");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const { Router } = express;
const routerProductos = Router();

routerProductos.get("/", async (req, res) => {
  try {
    let array = await conteiner.bringAll();
    console.log(array);
    res.json({
      mensaje: "aqui estan los productos ",
      array,
    });
  } catch (error) {
    console.log(error)
  }
 
});

routerProductos.post("/", (req, res) => {
  try {
    const objProducto = req.body;
    conteiner.save(objProducto);
  
    res.json({
      mensaje: "guardado con exito ",
      objProducto,
    });
  } catch (error) {
    console.log(error)
  }

});

routerProductos.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const producto = req.body;
  
    conteiner.upById({ id: parseInt(id), ...producto });
  } catch (error) {
    console.log(error)
  }
 
});

app.use("/api/productos", routerProductos);

const PORT = 4000;
const server = app.listen(PORT, () => {
  console.log(`some text ${server.address().port}`);
});
server.on("error", (err) => console.log(err));