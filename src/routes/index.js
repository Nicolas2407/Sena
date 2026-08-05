const express = require("express");

const router = express.Router();

// Rutas disponibles
router.use("/usuarios", require("./usuario.routes"));
router.use("/conceptos-contables", require("./conceptoscontables.routes"));
router.use("/direccion-nucleo", require("./direccionnucleo.routes"));
router.use("/elecciones", require("./elecciones.routes"));
router.use("/eventos-electorales", require("./eventoelectoral.routes"));
router.use("/excusas", require("./excusas.routes"));
router.use("/grupos", require("./grupo.routes"));

module.exports = router;