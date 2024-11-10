const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let responses = [
  {
    response: "¡Puedes obtenerla derrotando a Vegeta!",
    keywords: ["transformacion", "primera forma", "primera form"]
  },
  {
    response: "¡Para vencer a Freezer necesitas entrenar mucho!",
    keywords: ["entrenamiento", "vencer a freezer"]
  }
];

// Ruta para obtener respuestas basadas en palabras clave
app.post("/get-response", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send("No se proporcionó un mensaje.");

  for (let entry of responses) {
    for (let keyword of entry.keywords) {
      if (message.toLowerCase().includes(keyword.toLowerCase())) {
        return res.json({ response: entry.response });
      }
    }
  }
  res.json({ response: "No entiendo tu pregunta. Intenta ser más claro." });
});

// Ruta para agregar nuevas respuestas
app.post("/add-response", (req, res) => {
  const { response, keywords } = req.body;
  if (!response || !keywords || !Array.isArray(keywords)) {
    return res.status(400).send("Faltan datos válidos.");
  }
  responses.push({ response, keywords });
  res.send("Respuesta agregada correctamente.");
});

app.listen(port, () => {
  console.log(`API funcionando en http://localhost:${port}`);
});
