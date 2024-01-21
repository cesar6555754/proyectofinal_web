const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    cod_usuario: {
        type: String,
        required: true,
    },
    nombre_usuario: {
        type: String,
        required: true,
    },
    pass_usuario: {
        type: String,
        required: true,

    },
    tipo_usuario: {
        type: String,
        required: false,
    },
});

const Usuario = mongoose.model("Usuario", UserSchema);

module.exports = { Usuario };