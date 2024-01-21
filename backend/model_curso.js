const mongoose = require("mongoose");

const CursoSchema = new mongoose.Schema({

    cod_curso: {
        type: String,
        required: true,
    },
    nombre_curso: {
        type: String,
        required: true,
    },
    vacantes: {
        type: String,
        required: true,

    },
    precio: {
        type: String,
        required: false,
    },
    horario: {
        type: String,
        required: false,
    },
    cod_docente: {
        type: String,
        required: false,
    },


});

const Curso = mongoose.model("Curso", CursoSchema);

module.exports = { Curso };