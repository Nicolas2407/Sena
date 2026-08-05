const express = require("express");
const router = express.Router();

const Actividad = require("../models/Actividad");

// ======================================
// Obtener todas las actividades
// ======================================
router.get("/", async (req, res) => {
  try {
    const actividades = await Actividad.find()
      .populate("institucionId", "nombre")
      .populate("anioAcademicoId", "nombre")
      .populate("indicadorId", "nombre")
      .populate("asignaturaId", "nombre")
      .populate("grupoId", "nombre")
      .populate("docenteId", "nombres apellidos");

    res.json(actividades);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las actividades",
      error: error.message,
    });
  }
});

// ======================================
// Obtener actividad por ID
// ======================================
router.get("/:id", async (req, res) => {
  try {
    const actividad = await Actividad.findById(req.params.id)
      .populate("institucionId", "nombre")
      .populate("anioAcademicoId", "nombre")
      .populate("indicadorId", "nombre")
      .populate("asignaturaId", "nombre")
      .populate("grupoId", "nombre")
      .populate("docenteId", "nombres apellidos");

    if (!actividad) {
      return res.status(404).json({
        mensaje: "Actividad no encontrada",
      });
    }

    res.json(actividad);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar la actividad",
      error: error.message,
    });
  }
});

// ======================================
// Crear actividad
// ======================================
router.post("/", async (req, res) => {
  try {
    const actividad = new Actividad(req.body);
    const nuevaActividad = await actividad.save();

    res.status(201).json({
      mensaje: "Actividad creada correctamente",
      actividad: nuevaActividad,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear la actividad",
      error: error.message,
    });
  }
});

// ======================================
// Actualizar actividad
// ======================================
router.put("/:id", async (req, res) => {
  try {
    const actividad = await Actividad.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!actividad) {
      return res.status(404).json({
        mensaje: "Actividad no encontrada",
      });
    }

    res.json({
      mensaje: "Actividad actualizada correctamente",
      actividad,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar la actividad",
      error: error.message,
    });
  }
});

// ======================================
// Eliminar actividad
// ======================================
router.delete("/:id", async (req, res) => {
  try {
    const actividad = await Actividad.findByIdAndDelete(req.params.id);

    if (!actividad) {
      return res.status(404).json({
        mensaje: "Actividad no encontrada",
      });
    }

    res.json({
      mensaje: "Actividad eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la actividad",
      error: error.message,
    });
  }
});

// ======================================
// Obtener actividades por grupo
// ======================================
router.get("/grupo/:grupoId", async (req, res) => {
  try {
    const actividades = await Actividad.find({
      grupoId: req.params.grupoId,
    }).sort({ fechaLimite: 1 });

    res.json(actividades);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las actividades",
      error: error.message,
    });
  }
});

// ======================================
// Obtener actividades por asignatura
// ======================================
router.get("/asignatura/:asignaturaId", async (req, res) => {
  try {
    const actividades = await Actividad.find({
      asignaturaId: req.params.asignaturaId,
    }).sort({ fechaLimite: 1 });

    res.json(actividades);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las actividades",
      error: error.message,
    });
  }
});

// ======================================
// Obtener actividades por docente
// ======================================
router.get("/docente/:docenteId", async (req, res) => {
  try {
    const actividades = await Actividad.find({
      docenteId: req.params.docenteId,
    }).sort({ fechaCreacion: -1 });

    res.json(actividades);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las actividades",
      error: error.message,
    });
  }
});

// ======================================
// Obtener actividades por periodo
// ======================================
router.get("/periodo/:periodo", async (req, res) => {
  try {
    const actividades = await Actividad.find({
      periodo: req.params.periodo,
    }).sort({ fechaLimite: 1 });

    res.json(actividades);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las actividades",
      error: error.message,
    });
  }
});

module.exports = router;