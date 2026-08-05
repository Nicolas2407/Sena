const express = require("express");
const router = express.Router();

const Bitacora = require("../models/Bitacora");

// ======================================
// Obtener todos los registros
// ======================================
router.get("/", async (req, res) => {
  try {
    const registros = await Bitacora.find()
      .populate("institucionId", "nombre")
      .populate("usuarioId", "nombres apellidos")
      .sort({ createdAt: -1 });

    res.json(registros);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la bitácora",
      error: error.message,
    });
  }
});

// ======================================
// Obtener registros por institución
// ======================================
router.get("/institucion/:institucionId", async (req, res) => {
  try {
    const registros = await Bitacora.find({
      institucionId: req.params.institucionId,
    })
      .populate("usuarioId", "nombres apellidos")
      .sort({ createdAt: -1 });

    res.json(registros);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la bitácora",
      error: error.message,
    });
  }
});

// ======================================
// Obtener registros por usuario
// ======================================
router.get("/usuario/:usuarioId", async (req, res) => {
  try {
    const registros = await Bitacora.find({
      usuarioId: req.params.usuarioId,
    }).sort({ createdAt: -1 });

    res.json(registros);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la bitácora del usuario",
      error: error.message,
    });
  }
});

// ======================================
// Obtener registros por acción
// ======================================
router.get("/accion/:accion", async (req, res) => {
  try {
    const registros = await Bitacora.find({
      accion: req.params.accion,
    }).sort({ createdAt: -1 });

    res.json(registros);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los registros",
      error: error.message,
    });
  }
});

// ======================================
// Obtener registro por ID
// ======================================
router.get("/:id", async (req, res) => {
  try {
    const registro = await Bitacora.findById(req.params.id)
      .populate("institucionId", "nombre")
      .populate("usuarioId", "nombres apellidos");

    if (!registro) {
      return res.status(404).json({
        mensaje: "Registro no encontrado",
      });
    }

    res.json(registro);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar el registro",
      error: error.message,
    });
  }
});

// ======================================
// Crear registro
// ======================================
router.post("/", async (req, res) => {
  try {
    const registro = new Bitacora(req.body);
    await registro.save();

    res.status(201).json({
      mensaje: "Registro creado correctamente",
      registro,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear el registro",
      error: error.message,
    });
  }
});

// ======================================
// Eliminar registro
// ======================================
router.delete("/:id", async (req, res) => {
  try {
    const registro = await Bitacora.findByIdAndDelete(req.params.id);

    if (!registro) {
      return res.status(404).json({
        mensaje: "Registro no encontrado",
      });
    }

    res.json({
      mensaje: "Registro eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el registro",
      error: error.message,
    });
  }
});

module.exports = router;