const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');   // cross origin

const { Usuario } = require("./model_usuario");
const { Docente } = require("./model_docente");
const { Curso } = require("./model_curso");
const { Alumno } = require("./model_alumno");
const { Matricula } = require("./model_matricula");

const router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());

//endpoints usuarios
app.get("/usuarios", async (req, res) => {
    const allUsuarios = await Usuario.find();
    return res.status(200).json(allUsuarios);
});

app.get("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    const user = await Usuario.findById(id);
    return res.status(200).json(user);
});

app.post("/usuarios", async (req, res) => {
    const newUser = new Usuario({ ...req.body });
    const insertedUser = await newUser.save();
    return res.status(201).json(insertedUser);
});

app.put("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    await Usuario.updateOne({ _id: id }, req.body);
    const updatedUser = await Usuario.findById(id);
    return res.status(200).json(updatedUser);
});

app.delete("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    const deletedUser = await Usuario.findByIdAndDelete(id);
    return res.status(200).json(deletedUser);
});


//endpoints docentes
app.get("/docentes", async (req, res) => {
    const allUsuarios = await Docente.find();
    return res.status(200).json(allUsuarios);
});

app.get("/docentes/:id", async (req, res) => {
    const { id } = req.params;
    const user = await Docente.findById(id);
    return res.status(200).json(user);
});

app.post("/docentes", async (req, res) => {
    const newDocente = new Docente({ ...req.body });
    const insertedDocente = await newDocente.save();
    return res.status(201).json(insertedDocente);
});

app.put("/docentes/:id", async (req, res) => {
    const { id } = req.params;
    await Docente.updateOne({ _id: id }, req.body);
    const updatedUser = await Docente.findById(id);
    return res.status(200).json(updatedUser);
});

app.delete("/docentes/:id", async (req, res) => {
    const { id } = req.params;
    const deletedUser = await Docente.findByIdAndDelete(id);
    return res.status(200).json(deletedUser);
});
//endpoints cursos
app.get("/cursos", async (req, res) => {
    const allUsuarios = await Curso.find();
    return res.status(200).json(allUsuarios);
});

app.get("/cursos/:id", async (req, res) => {
    const { id } = req.params;
    const user = await Curso.findById(id);
    return res.status(200).json(user);
});

app.post("/cursos", async (req, res) => {
    const newDocente = new Curso({ ...req.body });
    const insertedDocente = await newDocente.save();
    return res.status(201).json(insertedDocente);
});

app.put("/cursos/:id", async (req, res) => {
    const { id } = req.params;
    await Curso.updateOne({ _id: id }, req.body);
    const updatedUser = await Curso.findById(id);
    return res.status(200).json(updatedUser);
});

app.delete("/cursos/:id", async (req, res) => {
    const { id } = req.params;
    const deletedUser = await Curso.findByIdAndDelete(id);
    return res.status(200).json(deletedUser);
});

//endpoints alumnos
app.get("/alumnos", async (req, res) => {
    const allUsuarios = await Alumno.find();
    return res.status(200).json(allUsuarios);
});

app.get("/alumnos/:id", async (req, res) => {
    const { id } = req.params;
    const user = await Alumno.findById(id);
    return res.status(200).json(user);
});

app.post("/alumnos", async (req, res) => {
    const newDocente = new Alumno({ ...req.body });
    const insertedDocente = await newDocente.save();
    return res.status(201).json(insertedDocente);
});

app.put("/alumnos/:id", async (req, res) => {
    const { id } = req.params;
    await Alumno.updateOne({ _id: id }, req.body);
    const updatedUser = await Alumno.findById(id);
    return res.status(200).json(updatedUser);
});

app.delete("/alumnos/:id", async (req, res) => {
    const { id } = req.params;
    const deletedUser = await Alumno.findByIdAndDelete(id);
    return res.status(200).json(deletedUser);
});

//endpoints matriculas
app.get("/matriculas", async (req, res) => {
    const allUsuarios = await Matricula.find();
    return res.status(200).json(allUsuarios);
});

app.get("/matriculas/:id", async (req, res) => {
    const { id } = req.params;
    const user = await Matricula.findById(id);
    return res.status(200).json(user);
});

app.post("/matriculas", async (req, res) => {
    const newDocente = new Matricula({ ...req.body });
    const insertedDocente = await newDocente.save();
    return res.status(201).json(insertedDocente);
});

app.put("/matriculas/:id", async (req, res) => {
    const { id } = req.params;
    await Matricula.updateOne({ _id: id }, req.body);
    const updatedUser = await Matricula.findById(id);
    return res.status(200).json(updatedUser);
});

app.delete("/matriculas/:id", async (req, res) => {
    const { id } = req.params;
    const deletedUser = await Matricula.findByIdAndDelete(id);
    return res.status(200).json(deletedUser);
});


app.post('/login', async (req, res) => {
    const { nombre_usuario, pass_usuario } = req.body;

    try {
        const usuario = await Usuario.findOne({ nombre_usuario });

        if (usuario && usuario.pass_usuario === pass_usuario) {
            // Contraseña válida, usuario autenticado
            return res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            // Usuario o contraseña incorrectos
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;


const start = async () => {
    try {
        await mongoose.connect(
            "mongodb://localhost:27017/dbcolegio"
        );
        app.listen(3000, () => console.log("Server started on port 3000"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();