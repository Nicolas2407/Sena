const express = require('express');
const router = express.Router();
const Institucion = require('../models/Institucion');

// Obtener todas las instituciones
router.get('/', async (req, res) => {
  try {
    const instituciones = await Institucion.find()
      .populate('nucleoId')
      .populate('rectorId')
      .populate('secretariaId');

    res.json(instituciones);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Obtener una institución por ID
router.get('/:id', async (req, res) => {
  try {
    const institucion = await Institucion.findById(req.params.id)
      .populate('nucleoId')
      .populate('rectorId')
      .populate('secretariaId');

    if (!institucion) {
      return res.status(404).json({ mensaje: 'Institución no encontrada' });
    }

    res.json(institucion);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Crear una institución
router.post('/', async (req, res) => {
  try {
    const nuevaInstitucion = new Institucion(req.body);
    const institucionGuardada = await nuevaInstitucion.save();

    res.status(201).json(institucionGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Actualizar una institución
router.put('/:id', async (req, res) => {
  try {
    const institucionActualizada = await Institucion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!institucionActualizada) {
      return res.status(404).json({ mensaje: 'Institución no encontrada' });
    }

    res.json(institucionActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Eliminar una institución
router.delete('/:id', async (req, res) => {
  try {
    const institucionEliminada = await Institucion.findByIdAndDelete(req.params.id);

    if (!institucionEliminada) {
      return res.status(404).json({ mensaje: 'Institución no encontrada' });
    }

    res.json({ mensaje: 'Institución eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;