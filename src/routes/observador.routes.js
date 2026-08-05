const express = require('express');
const router = express.Router();
const Observador = require('../models/Observador');

// Obtener todos los registros del observador
router.get('/', async (req, res) => {
  try {
    const observaciones = await Observador.find()
      .populate('institucionId')
      .populate('anioAcademicoId')
      .populate('estudianteId')
      .populate('docenteId')
      .populate('coordinadorId')
      .populate('seguimiento.responsable');

    res.json(observaciones);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Obtener un registro por ID
router.get('/:id', async (req, res) => {
  try {
    const observacion = await Observador.findById(req.params.id)
      .populate('institucionId')
      .populate('anioAcademicoId')
      .populate('estudianteId')
      .populate('docenteId')
      .populate('coordinadorId')
      .populate('seguimiento.responsable');

    if (!observacion) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }

    res.json(observacion);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Crear un registro
router.post('/', async (req, res) => {
  try {
    const nuevaObservacion = new Observador(req.body);
    const observacionGuardada = await nuevaObservacion.save();

    res.status(201).json(observacionGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Actualizar un registro
router.put('/:id', async (req, res) => {
  try {
    const observacionActualizada = await Observador.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!observacionActualizada) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }

    res.json(observacionActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Eliminar un registro
router.delete('/:id', async (req, res) => {
  try {
    const observacionEliminada = await Observador.findByIdAndDelete(req.params.id);

    if (!observacionEliminada) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }

    res.json({ mensaje: 'Registro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;