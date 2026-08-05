const express = require("express");
const router = express.Router();

const Grupo = require("../models/grupo");

// Obtener todos los grupos
router.get("/", async (req, res) => {
  try {
    const grupos = await Grupo.find()
      .populate("institucionId")
      .populate("anioAcademicoId")
      .populate("sedeId")
      .populate("docenteDirectorId");

    res.json(grupos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los grupos",
      error: error.message
    });
  }
});

// Obtener un grupo por ID
router.get("/:id", async (req, res) => {
  try {
    const grupo = await Grupo.findById(req.params.id)
      .populate("institucionId")
      .populate("anioAcademicoId")
      .populate("sedeId")
      .populate("docenteDirectorId");

    if (!grupo) {
      return res.status(404).json({
        mensaje: "Grupo no encontrado"
      });
    }

    res.json(grupo);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar el grupo",
      error: error.message
    });
  }
});

// Crear un grupo
router.post("/", async (req, res) => {
  try {
    const nuevoGrupo = new Grupo(req.body);
    const grupoGuardado = await nuevoGrupo.save();

    res.status(201).json(grupoGuardado);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear el grupo",
      error: error.message
    });
  }
});

// Actualizar un grupo
router.put("/:id", async (req, res) => {
  try {
    const grupoActualizado = await Grupo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!grupoActualizado) {
      return res.status(404).json({
        mensaje: "Grupo no encontrado"
      });
    }

    res.json(grupoActualizado);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar el grupo",
      error: error.message
    });
  }
});

// Eliminar un grupo
router.delete("/:id", async (req, res) => {
  try {
    const grupoEliminado = await Grupo.findByIdAndDelete(req.params.id);

    if (!grupoEliminado) {
      return res.status(404).json({
        mensaje: "Grupo no encontrado"
      });
    }

    res.json({
      mensaje: "Grupo eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el grupo",
      error: error.message
    });
  }
});

module.exports = router;