const mongoose = require("mongoose");

const AlumnoSchema = new mongoose.Schema({

    cod_alumno: {
        type: String,
        required: true,
    },
    nombre_alumno: {
        type: String,
        required: true,
    },
    edad_alumno: {
        type: String,
        required: true,

    },
    sexo_alumno: {
        type: String,
        required: false,
    },
    horario: {
        type: String,
        required: false,
    },
    correo_alumno: {
        type: String,
        required: false,
    },
    cel_alumno: {
        type: String,
        required: false,
    },


});

const Alumno = mongoose.model("Alumno", AlumnoSchema);

module.exports = { Alumno };