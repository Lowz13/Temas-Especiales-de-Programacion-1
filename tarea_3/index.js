// importacion de librerias y funciones
import 'dotenv/config';
import express from "express";
import cors from "cors";
import connectDB from './config/db.js'

import {obtenerTodasLasPizzasAsync,
  obtenerTodasLasPizzaPorIdAsync,
  agregarPizzaAsync,
  actualizarPizzaAsync,
  eliminarPizzaAsync} from './repositorios/pizza.repositorio.js'


// Configuración del servidor
const app = express();
app.use(cors());


//Config para usar el body en POST
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000;
connectDB(); // Conectar a la base de datos

// Configuración de la ruta GET para obtener todas las pizzas
app.get("/api/v1/pizzas", async (req, res) => {
  const pizzas = await obtenerTodasLasPizzasAsync();
  return res.status(200).json(pizzas);
});

// configuración de la ruta GET para obtener una pizza por su ID
app.get("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id;
  const pizza = await obtenerTodasLasPizzaPorIdAsync(id);
  return res.status(200).json(pizza);
});

// Configuración de la ruta POST para agregar una nueva pizza
app.post("/api/v1/pizzas", async (req, res) => {
  const pizza = req.body
  const pizzaCreada = await agregarPizzaAsync(pizza);
  const respuestaDto = {
    mensaje : "Pizza agregada",
    id : pizzaCreada._id,
    fecha: new Date()
  }
  return res.status(201).json(respuestaDto)
})

// Configuración de la ruta PUT para actualizar una pizza por su ID
app.put('/api/v1/pizzas/:id', async (req, res) => {
  const id = req.params.id;
    const datosActualizados = req.body;

    const pizzaActualizada = await actualizarPizzaAsync({ _id: id, ...datosActualizados });

    if (!pizzaActualizada) return res.status(404).json({ error: "Pizza no encontrada" });
    res.json(pizzaActualizada);
});

// Configuración de la ruta DELETE para eliminar una pizza por su ID
app.delete('/api/v1/pizzas/:id', async (req, res) => {
  const id = req.params.id;
  const eliminada = await eliminarPizzaAsync(id);
  if (!eliminada) return res.status(404).json({ error: "Pizza no encontrada" });
    res.json({ mensaje: `Pizza con id ${id} eliminada` });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

// mongoose.connect(mongoURI)
//   .then(() => console.log('¡Conectado exitosamente a MongoDB Docker! 🍕'))
//   .catch(err => console.error('Error al conectar a MongoDB:', err));
