const express = require("express");
const { describe } = require("node:test");
const app = express();
const PORT = 3000; // Puerto en el que escuchará el servidor
app.get("/api/pizzas", (req, res) => {
  const pipzzas = {
    items: [
      {
        id: "1",
        nombre: "Peperoni",
        ingredientes: ["peperoni", "tomate", "mozzarella"],
      },
      {
        id: "2",
        nombre: "Hawaiana",
        ingredientes: ["tomate", "mozzarella", "piña", "jamón"],
      },
      {
        id: "3",
        nombre: "Carnes frias",
        ingredientes: ["tomate", "mozzarella", "jamón", "salchicha", "salami", "tocino"],
      },
    ],
  };
  return res.json(pipzzas)
});

app.get("/api/pizzas/tamanios", (req, res) => {
  const tamanios = {
    items: [
      {
        id: "1",
        nombre: "Pequeña",
        precio: 80,
        describe: "10 cm de diametro"
      },
      {
        id: "2",
        nombre: "Mediana",
        precio: 100,
        describe: "15 cm de diametro"
      },
      {
        id: "3",
        nombre: "Grande",
        precio: 120,
        describe: "20 cm de diametro"
      },
      {
        id: "4",
        nombre: "Familiar",
        precio: 150,
        describe: "25 cm de diametro"
      },
    ],
  }; return res.json(tamanios);
});

app.get("/api/bebidas", (req, res) => {
  const bebidas = {
    items: [
      {
        id: "1",
        nombre: "Coca-Cola",
        tamanio: [
          {
            id: "01",
            cantidad: "600 ml",
            precio: 20
          },
          {
            id: "02",
            cantidad: "1 L",
            precio: 25
          },
          {
            id: "03",
            cantidad: "3 L",
            precio: 50
          }
        ]
      },
      {
        id: "2",
        nombre: "Sprite",
        tamanio: [
          {
            id: "04",
            cantidad: "600 ml",
            precio: 18
          },
          {
            id: "05",
            cantidad: "1 L",
            precio: 24
          },
          {
            id: "06",
            cantidad: "3 L",
            precio: 43
          }
        ]
      },
      {
        id: "3",
        nombre: "Fanta",
        tamanio: [
          {
            id: "07",
            cantidad: "600 ml",
            precio: 15
          },
          {
            id: "08",
            cantidad: "1 L",
            precio: 20
          },
          {
            id: "09",
            cantidad: "3 L",
            precio: 40
          }
        ]
      },
    ],
  };
  return res.json(bebidas);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
