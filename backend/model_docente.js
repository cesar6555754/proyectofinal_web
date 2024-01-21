const mongoose = require("mongoose");

const DocentSchema = new mongoose.Schema({

    cod_docente: {
        type: String,
        required: true,
    },
    nombre_docente: {
        type: String,
        required: true,
    },
    edad_docente: {
        type: String,
        required: true,

    },
    especialidad_docente: {
        type: String,
        required: false,
    },
    tipo_usuario: {
        type: String,
        required: false,
    },

});

const Docente = mongoose.model("Docente", DocentSchema);

module.exports = { Docente };