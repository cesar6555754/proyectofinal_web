const mongoose = require("mongoose");

const MatriculaSchema = new mongoose.Schema({

    cod_matricula: {
        type: String,
        required: true,
    },
    nombre_alumno: {
        type: String,
        required: true,
    },
    codigo_boucher: {
        type: String,
        required: true,
    },
    matricula_matematica: {
        type: Boolean,
        required: true,

    },
    matricula_ingles: {
        type: Boolean,
        required: false,
    },
    matricula_diseno: {
        type: Boolean,
        required: false,
    },
    matricula_danza: {
        type: Boolean,
        required: false,
    },


});

const Matricula = mongoose.model("Matricula", MatriculaSchema);

module.exports = { Matricula };