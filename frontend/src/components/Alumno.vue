<template>
  <div class="banner">
    <div class="banner-content">
      <img src="https://mijaelparedes.site/img/logo3.png" alt="Logo del colegio" class="logo">
      <h1>Colegio Villa el Golf</h1>
      <button @click="redirectToOtraPagina" class="redirection-button">Menú principal</button>
    </div>
  </div>
  <div class="container">
    <div class="column report-column">
      <h2>Alumnos</h2>
      <input v-model="searchTerm" type="text" id="filtrar_datos">
      <button @click="generateReport" class="generate-report-btn">Buscar todos los datos</button><br><br>

      <ul>
        <li v-for="(alumno, index) in alumnos" :key="alumno._id" class="user-item">
          <div class="alumno-info">
            <span class="alumno-property">Código:</span> {{ alumno.cod_alumno }}<br>
            <span class="alumno-property">Nombre:</span> {{ alumno.nombre_alumno }}<br>
            <span class="alumno-property">Edad:</span> {{ alumno.edad_alumno }}<br>
            <span class="alumno-property">Sexo:</span> {{ alumno.sexo_alumno }}<br>
            <span class="alumno-property">Correo:</span> {{ alumno.correo_alumno }}<br>
            <span class="alumno-property">Teléfono:</span> {{ alumno.cel_alumno }}
          </div>
          <div class="alumno-buttons">
            <button @click="deleteAlumno(alumno._id)" class="delete-btn">Eliminar</button>
            <button @click="openEditDialog(alumno, index)" class="edit-btn">Editar</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="column form-column">
      <form @submit.prevent="addAlumno" class="add-alumno-form">
        <h2>Nuevo Registro</h2>
        <div class="form-group">
          <label for="newCodAlumno">Código de Alumno:</label>
          <input v-model="newAlumno.cod_alumno" type="text" id="newCodAlumno" required>
        </div>

        <div class="form-group">
          <label for="newNombreAlumno">Nombre de Alumno:</label>
          <input v-model="newAlumno.nombre_alumno" type="text" id="newNombreAlumno" required>
        </div>

        <div class="form-group">
          <label for="newEdadAlumno">Edad de Alumno:</label>
          <input v-model="newAlumno.edad_alumno" type="number" id="newEdadAlumno" required>
        </div>

        <div class="form-group">
          <label for="newSexoAlumno">Sexo de Alumno:</label>
          <input v-model="newAlumno.sexo_alumno" type="text" id="newSexoAlumno" required>
        </div>

        <div class="form-group">
          <label for="newCorreoAlumno">Correo de Alumno:</label>
          <input v-model="newAlumno.correo_alumno" type="email" id="newCorreoAlumno" required>
        </div>

        <div class="form-group">
          <label for="newCelAlumno">Teléfono de Alumno:</label>
          <input v-model="newAlumno.cel_alumno" type="text" id="newCelAlumno" required>
        </div>

        <button type="submit" class="add-btn">Agregar Alumno</button>
      </form>
    </div>

    <div v-if="isEditDialogVisible" class="edit-dialog">
      <div class="edit-dialog-content">
        <span @click="closeEditDialog" class="close">&times;</span>
        <h2>Editar Alumno</h2>
        <form @submit.prevent="updateAlumno">
          <div class="form-group">
            <label for="editCodAlumno">Código de Alumno:</label>
            <input v-model="editedAlumno.cod_alumno" type="text" id="editCodAlumno" required>
          </div>

          <div class="form-group">
            <label for="editNombreAlumno">Nombre de Alumno:</label>
            <input v-model="editedAlumno.nombre_alumno" type="text" id="editNombreAlumno" required>
          </div>

          <div class="form-group">
            <label for="editEdadAlumno">Edad de Alumno:</label>
            <input v-model="editedAlumno.edad_alumno" type="number" id="editEdadAlumno" required>
          </div>

          <div class="form-group">
            <label for="editSexoAlumno">Sexo de Alumno:</label>
            <input v-model="editedAlumno.sexo_alumno" type="text" id="editSexoAlumno" required>
          </div>

          <div class="form-group">
            <label for="editCorreoAlumno">Correo de Alumno:</label>
            <input v-model="editedAlumno.correo_alumno" type="email" id="editCorreoAlumno" required>
          </div>

          <div class="form-group">
            <label for="editCelAlumno">Teléfono de Alumno:</label>
            <input v-model="editedAlumno.cel_alumno" type="text" id="editCelAlumno" required>
          </div>

          <button type="submit" class="save-btn">Guardar cambios</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      alumnos: [],
      newAlumno: {},
      editedAlumno: {},
      backend_server: 'http://127.0.0.1:3000',
      isEditDialogVisible: false,
      editedAlumnoIndex: -1,
      searchTerm: ''
    };
  },
  methods: {
    addAlumno() {
      axios.post(`${this.backend_server}/alumnos`, this.newAlumno)
        .then(res => {
          this.alumnos.push(res.data);
          this.newAlumno = {};
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteAlumno(alumnoId) {
      axios.delete(`${this.backend_server}/alumnos/${alumnoId}`)
        .then(() => {
          this.alumnos = this.alumnos.filter(a => a._id !== alumnoId);
        })
        .catch(error => {
          console.error(error);
        });
    },
    openEditDialog(alumno, index) {
      this.editedAlumno = { ...alumno };
      this.editedAlumnoIndex = index;
      this.isEditDialogVisible = true;
    },
    closeEditDialog() {
      this.isEditDialogVisible = false;
      this.editedAlumno = {};
      this.editedAlumnoIndex = -1;
    },
    updateAlumno() {
      axios.put(`${this.backend_server}/alumnos/${this.editedAlumno._id}`, this.editedAlumno)
        .then(() => {
          if (this.editedAlumnoIndex !== -1 && this.alumnos[this.editedAlumnoIndex]) {
            Object.assign(this.alumnos[this.editedAlumnoIndex], this.editedAlumno);
          }
          this.closeEditDialog();
        })
        .catch(error => {
          console.error(error);
        });
    },
    generateReport() {
      const searchTerm = this.searchTerm.toLowerCase();

      if (searchTerm.trim() === '') {
        this.loadAllAlumnos();
      } else {
        const filteredAlumnos = this.alumnos.filter(alumno => {
          return alumno.cod_alumno.toLowerCase().includes(searchTerm);
        });

        this.alumnos = filteredAlumnos;
      }
    },
    loadAllAlumnos() {
      axios.get(`${this.backend_server}/alumnos`)
        .then(res => {
          this.alumnos = res.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    redirectToOtraPagina() {
      // Coloca la lógica para redirigir a la otra página
      window.location.href = 'http://localhost:5173/siagie.html';
    },
  }
};
</script>

<style scoped>
.banner {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
}

.redirection-button {
  margin-left: 35px;

}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  max-width: 100px;
  /* Ajusta el ancho según sea necesario */
  margin-right: 10px;
}

h1 {
  margin: 0;
}

.container {
  display: flex;
}

.column {
  flex: 1;
  padding: 20px;
}

.report-column {
  background-color: #f9f9f9;
}

.user-item {
  list-style: none;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  flex: 1;
}

.user-buttons button {
  margin-left: 10px;
  cursor: pointer;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.3s;
}

.delete-btn {
  background-color: #e74c3c;
}

.edit-btn {
  background-color: #3498db;
}

.form-column {
  background-color: #fff;
  padding-left: 20px;
}

.add-user-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.add-btn {
  background-color: #2ecc71;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #27ae60;
}

.edit-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.edit-dialog-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #333;
}

.save-btn {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.save-btn:hover {
  background-color: #2980b9;
}

.generate-report-btn {
  background-color: #4caf50;
  /* Color de fondo */
  color: white;
  /* Color del texto */
  border: none;
  padding: 10px 20px;
  /* Espaciado interno */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  /* Bordes redondeados */
  transition: background-color 0.3s;
  /* Transición suave al pasar el mouse */

}

.generate-report-btn:hover {
  background-color: #45a049;
  /* Cambiar color de fondo al pasar el mouse */
}
</style>