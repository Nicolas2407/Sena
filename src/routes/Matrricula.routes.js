const express = require('express');
const router = express.Router();
const Matricula = require('../models/Matricula');

// Obtener todas las matrículas
router.get('/', async (req, res) => {
  try {
    const matriculas = await Matricula.find()
      .populate('institucionId')
      .populate('anioAcademicoId')
      .populate('estudianteId')
      .populate('grupoId');

    res.json(matriculas);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Obtener una matrícula por ID
router.get('/:id', async (req, res) => {
  try {
    const matricula = await Matricula.findById(req.params.id)
      .populate('institucionId')
      .populate('anioAcademicoId')
      .populate('estudianteId')
      .populate('grupoId');

    if (!matricula) {
      return res.status(404).json({ mensaje: 'Matrícula no encontrada' });
    }

    res.json(matricula);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Crear una matrícula
router.post('/', async (req, res) => {
  try {
    const nuevaMatricula = new Matricula(req.body);
    const matriculaGuardada = await nuevaMatricula.save();

    res.status(201).json(matriculaGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Actualizar una matrícula
router.put('/:id', async (req, res) => {
  try {
    const matriculaActualizada = await Matricula.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!matriculaActualizada) {
      return res.status(404).json({ mensaje: 'Matrícula no encontrada' });
    }

    res.json(matriculaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Eliminar una matrícula
router.delete('/:id', async (req, res) => {
  try {
    const matriculaEliminada = await Matricula.findByIdAndDelete(req.params.id);

    if (!matriculaEliminada) {
      return res.status(404).json({ mensaje: 'Matrícula no encontrada' });
    }

    res.json({ mensaje: 'Matrícula eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;