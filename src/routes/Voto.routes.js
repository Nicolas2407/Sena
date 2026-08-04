const express = require('express');
const router = express.Router();
const Voto = require('../models/Voto');

// Obtener todos los votos
router.get('/', async (req, res) => {
  try {
    const votos = await Voto.find()
      .populate('eventoId')
      .populate('estudianteId');

    res.json(votos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Obtener un voto por ID
router.get('/:id', async (req, res) => {
  try {
    const voto = await Voto.findById(req.params.id)
      .populate('eventoId')
      .populate('estudianteId');

    if (!voto) {
      return res.status(404).json({ mensaje: 'Voto no encontrado' });
    }

    res.json(voto);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Registrar un voto
router.post('/', async (req, res) => {
  try {
    const nuevoVoto = new Voto(req.body);
    const votoGuardado = await nuevoVoto.save();

    res.status(201).json(votoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Actualizar un voto
router.put('/:id', async (req, res) => {
  try {
    const votoActualizado = await Voto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!votoActualizado) {
      return res.status(404).json({ mensaje: 'Voto no encontrado' });
    }

    res.json(votoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Eliminar un voto
router.delete('/:id', async (req, res) => {
  try {
    const votoEliminado = await Voto.findByIdAndDelete(req.params.id);

    if (!votoEliminado) {
      return res.status(404).json({ mensaje: 'Voto no encontrado' });
    }

    res.json({ mensaje: 'Voto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;