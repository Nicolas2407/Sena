const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        mensaje: "Obtener todos los usuarios"
    });
});

router.get("/:id", (req, res) => {
    res.json({
        mensaje: "Obtener usuario",
        id: req.params.id
    });
});

router.post("/", (req, res) => {
    res.json({
        mensaje: "Crear usuario"
    });
});

router.put("/:id", (req, res) => {
    res.json({
        mensaje: "Actualizar usuario",
        id: req.params.id
    });
});

router.delete("/:id", (req, res) => {
    res.json({
        mensaje: "Eliminar usuario",
        id: req.params.id
    });
});

module.exports = router;