const express = require('express');
const router = express.Router();

const Catalogo = require('../models/catalogo');

// ======================================
// Obtener todos los catálogos
// ======================================
router.get('/', async (req, res) => {
  try {
    const catalogos = await Catalogo.find()
      .populate('institucionId')
      .sort({ tipo: 1, orden: 1, nombre: 1 });

    res.json(catalogos);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
});

// ======================================
// Obtener un catálogo por ID
// ======================================
router.get('/:id', async (req, res) => {
  try {
    const catalogo = await Catalogo.findById(req.params.id)
      .populate('institucionId');

    if (!catalogo) {
      return res.status(404).json({
        mensaje: 'Catálogo no encontrado'
      });
    }

    res.json(catalogo);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
});

// ======================================
// Crear catálogo
// ======================================
router.post('/', async (req, res) => {
  try {
    const nuevoCatalogo = new Catalogo(req.body);

    const guardado = await nuevoCatalogo.save();

    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
});

// ======================================
// Actualizar catálogo
// ======================================
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Catalogo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!actualizado) {
      return res.status(404).json({
        mensaje: 'Catálogo no encontrado'
      });
    }

    res.json(actualizado);
  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
});

// ======================================
// Eliminar catálogo
// ======================================
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Catalogo.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({
        mensaje: 'Catálogo no encontrado'
      });
    }

    res.json({
      mensaje: 'Catálogo eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
});

module.exports = router;