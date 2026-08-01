require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`[OK] MongoDB Conectado: ${mongoose.connection.host}`);
    console.log(`[INFO] Base de datos: ${mongoose.connection.name}`);

    // Ruta de prueba
    app.get("/", (req, res) => {
      res.json({
        mensaje: "Bienvenido a la API de EasyNotes",
        estado: "Servidor funcionando correctamente"
      });
    });

    // Mostrar modelos disponibles
    console.log("\nModelos registrados:");
    const modelFiles = [
      "Actividad",
      "AnioAcademico",
      "Area",
      "Asignatura",
      "Bitacora",
      "Calificacion",
      "CargaAcademica",
      "Catalogo",
      "Comunicados",
      "Comunicado",
      "ConceptosContables",
      "DireccionNucleo",
      "Elecciones",
      "EventoElectoral",
      "Excusas",
      "Grupo",
      "Indicador",
      "Institucion",
      "Matricula",
      "Observador",
      "Pagos",
      "Prematricula",
      "Sede",
      "SolicitudRegistro",
      "Usuario",
      "Voto"
    ];

    modelFiles.forEach(model => console.log(`   - ${model}`));

    const stats = await mongoose.connection.db.stats();

    console.log("\n[INFO] Estadísticas:");
    console.log(`   Documentos: ${stats.objects}`);
    console.log(`   Tamaño: ${(stats.dataSize / 1024).toFixed(1)} KB`);

    // Iniciar Express
    app.listen(PORT, () => {
      console.log(`\n[OK] API ejecutándose en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("[ERROR]", error.message);
    process.exit(1);
  }
};

startServer();