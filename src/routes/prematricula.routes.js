const express = require('express');
const router = express.Router();
const Prematricula = require('../models/Prematricula');

// Obtener todas las prematrículas
router.get('/', async (req, res) => {
  try {
    const prematriculas = await Prematricula.find()
      .populate('institucionId')
      .populate('anioAcademicoId');

    res.json(prematriculas);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Obtener una prematrícula por ID
router.get('/:id', async (req, res) => {
  try {
    const prematricula = await Prematricula.findById(req.params.id)
      .populate('institucionId')
      .populate('anioAcademicoId');

    if (!prematricula) {
      return res.status(404).json({ mensaje: 'Prematrícula no encontrada' });
    }

    res.json(prematricula);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Crear una prematrícula
router.post('/', async (req, res) => {
  try {
    const nuevaPrematricula = new Prematricula(req.body);
    const prematriculaGuardada = await nuevaPrematricula.save();

    res.status(201).json(prematriculaGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Actualizar una prematrícula
router.put('/:id', async (req, res) => {
  try {
    const prematriculaActualizada = await Prematricula.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!prematriculaActualizada) {
      return res.status(404).json({ mensaje: 'Prematrícula no encontrada' });
    }

    res.json(prematriculaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Eliminar una prematrícula
router.delete('/:id', async (req, res) => {
  try {
    const prematriculaEliminada = await Prematricula.findByIdAndDelete(req.params.id);

    if (!prematriculaEliminada) {
      return res.status(404).json({ mensaje: 'Prematrícula no encontrada' });
    }

    res.json({ mensaje: 'Prematrícula eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;