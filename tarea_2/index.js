import express from "express";
import cors from "cors";
import {obtenerTodasLasPizzasAsync, 
  obtenerTodasLasPizzaPorIdAsync,
  agregarPizzaAsync,
  actualizarPizzaAsync,
  eliminarPizzaAsync} from './repositorios/pizza.repositorio.js'

const app = express();
app.use(cors());
const PORT = 3000;

//Config para usar el body en POST
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/api/v1/pizzas", async (req, res) => {
  const pizzas = await obtenerTodasLasPizzasAsync();
  return res.status(200).json(pizzas);
});

app.get("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id;
  const pizza = await obtenerTodasLasPizzaPorIdAsync(id);
  return res.status(200).json(pizza);
});
app.post("/api/v1/pizzas", async (req, res) => {
  const pizza = req.body
  console.log(pizza)
  await agregarPizzaAsync(pizza);
  const respuestaDto = {
    mensaje : "Pizza agregada",
    id : pizza.id,
    fecha: new Date()
  }
  return res.status(201).json(respuestaDto)
})

app.put('/api/v1/pizzas/:id', async (req, res) => {
    const id = Number(req.params.id);
    const datosActualizados = req.body;

    const pizzaActualizada = await actualizarPizzaAsync({ id, ...datosActualizados });

    if (!pizzaActualizada) return res.status(404).json({ error: "Pizza no encontrada" });
    res.json(pizzaActualizada);
});

app.delete('/api/v1/pizzas/:id', async (req, res) => {
    const id = req.params.id;   
  const eliminada = await eliminarPizzaAsync(id);
  if (!eliminada) return res.status(404).json({ error: "Pizza no encontrada" });
    res.json({ mensaje: `Pizza con id ${id} eliminada` });
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto http://localhost:${PORT}`);
});
