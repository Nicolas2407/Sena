const express = require("express");

const router = express.Router();

// Rutas disponibles
router.use("/usuarios", require("./usuario.routes"));

module.exports = router;