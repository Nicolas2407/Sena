const express = require('express');
const router = express.Router();

const Asignatura = require('../models/Asignatura');

// ==========================
// Obtener todas las asignaturas
// ==========================
router.get('/', async (req, res) => {
  try {
    const asignaturas = await Asignatura.find()
      .populate('institucionId', 'nombre')
      .populate('areaId', 'nombre');

    res.json(asignaturas);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener las asignaturas',
      error: error.message
    });
  }
});

// ==========================
// Obtener una asignatura por ID
// ==========================
router.get('/:id', async (req, res) => {
  try {
    const asignatura = await Asignatura.findById(req.params.id)
      .populate('institucionId', 'nombre')
      .populate('areaId', 'nombre');

    if (!asignatura) {
      return res.status(404).json({
        mensaje: 'Asignatura no encontrada'
      });
    }

    res.json(asignatura);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al buscar la asignatura',
      error: error.message
    });
  }
});

// ==========================
// Crear asignatura
// ==========================
router.post('/', async (req, res) => {
  try {
    const asignatura = new Asignatura(req.body);
    const nuevaAsignatura = await asignatura.save();

    res.status(201).json({
      mensaje: 'Asignatura creada correctamente',
      asignatura: nuevaAsignatura
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al crear la asignatura',
      error: error.message
    });
  }
});

// ==========================
// Actualizar asignatura
// ==========================
router.put('/:id', async (req, res) => {
  try {
    const asignatura = await Asignatura.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!asignatura) {
      return res.status(404).json({
        mensaje: 'Asignatura no encontrada'
      });
    }

    res.json({
      mensaje: 'Asignatura actualizada correctamente',
      asignatura
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar la asignatura',
      error: error.message
    });
  }
});

// ==========================
// Eliminar asignatura
// ==========================
router.delete('/:id', async (req, res) => {
  try {
    const asignatura = await Asignatura.findByIdAndDelete(req.params.id);

    if (!asignatura) {
      return res.status(404).json({
        mensaje: 'Asignatura no encontrada'
      });
    }

    res.json({
      mensaje: 'Asignatura eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar la asignatura',
      error: error.message
    });
  }
});

// ==========================
// Obtener asignaturas por institución
// ==========================
router.get('/institucion/:institucionId', async (req, res) => {
  try {
    const asignaturas = await Asignatura.find({
      institucionId: req.params.institucionId
    }).sort({ orden: 1 });

    res.json(asignaturas);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener las asignaturas',
      error: error.message
    });
  }
});

// ==========================
// Obtener asignaturas por área
// ==========================
router.get('/area/:areaId', async (req, res) => {
  try {
    const asignaturas = await Asignatura.find({
      areaId: req.params.areaId
    }).sort({ orden: 1 });

    res.json(asignaturas);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener las asignaturas',
      error: error.message
    });
  }
});

module.exports = router;