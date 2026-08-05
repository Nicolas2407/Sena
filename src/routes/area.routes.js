const express = require("express");
const router = express.Router();

const Area = require("../models/Area");

// ======================================
// Obtener todas las áreas
// ======================================
router.get("/", async (req, res) => {
  try {
    const areas = await Area.find()
      .populate("institucionId", "nombre")
      .sort({ orden: 1 });

    res.json(areas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las áreas",
      error: error.message,
    });
  }
});

// ======================================
// Obtener áreas por institución
// ======================================
router.get("/institucion/:institucionId", async (req, res) => {
  try {
    const areas = await Area.find({
      institucionId: req.params.institucionId,
    }).sort({ orden: 1 });

    res.json(areas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las áreas",
      error: error.message,
    });
  }
});

// ======================================
// Obtener área por ID
// ======================================
router.get("/:id", async (req, res) => {
  try {
    const area = await Area.findById(req.params.id)
      .populate("institucionId", "nombre");

    if (!area) {
      return res.status(404).json({
        mensaje: "Área no encontrada",
      });
    }

    res.json(area);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar el área",
      error: error.message,
    });
  }
});

// ======================================
// Crear área
// ======================================
router.post("/", async (req, res) => {
  try {
    const area = new Area(req.body);
    await area.save();

    res.status(201).json({
      mensaje: "Área creada correctamente",
      area,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear el área",
      error: error.message,
    });
  }
});

// ======================================
// Actualizar área
// ======================================
router.put("/:id", async (req, res) => {
  try {
    const area = await Area.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!area) {
      return res.status(404).json({
        mensaje: "Área no encontrada",
      });
    }

    res.json({
      mensaje: "Área actualizada correctamente",
      area,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar el área",
      error: error.message,
    });
  }
});

// ======================================
// Eliminar área
// ======================================
router.delete("/:id", async (req, res) => {
  try {
    const area = await Area.findByIdAndDelete(req.params.id);

    if (!area) {
      return res.status(404).json({
        mensaje: "Área no encontrada",
      });
    }

    res.json({
      mensaje: "Área eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el área",
      error: error.message,
    });
  }
});

// ======================================
// Obtener áreas por estado
// ======================================
router.get("/estado/:estado", async (req, res) => {
  try {
    const areas = await Area.find({
      estado: req.params.estado,
    }).sort({ orden: 1 });

    res.json(areas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las áreas",
      error: error.message,
    });
  }
});

module.exports = router;