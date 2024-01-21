<template>
  <div class="banner">
    <div class="banner-content">
      <img src="https://mijaelparedes.site/img/logo3.png" alt="Logo del colegio" class="logo">
      <h1>Colegio Villa el Golf</h1>
      <button @click="redirectToOtraPagina" class="redirection-button">Salir</button>

    </div>
  </div>
  <div class="container">
    <div class="column form-column">
      <form @submit.prevent="addMatricula" class="add-matricula-form">
        <h2>Nueva Matrícula</h2>
        <div class="form-group">
          <label for="newCodMatricula">Código de Matrícula:</label>
          <input v-model="newMatricula.cod_matricula" type="text" id="newCodMatricula" required>
        </div>

        <div class="form-group">
          <label for="newNombreAlumno">Nombre del Alumno:</label>
          <input v-model="newMatricula.nombre_alumno" type="text" id="newNombreAlumno" required>
        </div>

        <div class="form-group">
          <label for="newCodigoBoucher">Código de Boucher:</label>
          <input v-model="newMatricula.codigo_boucher" type="text" id="newCodigoBoucher" required>
        </div>

        <div class="form-group">
          <label for="newMatriculaMatematica">Matrícula Matemática:</label>
          <input v-model="newMatricula.matricula_matematica" type="checkbox" id="newMatriculaMatematica">
        </div>

        <div class="form-group">
          <label for="newMatriculaIngles">Matrícula Inglés:</label>
          <input v-model="newMatricula.matricula_ingles" type="checkbox" id="newMatriculaIngles">
        </div>

        <div class="form-group">
          <label for="newMatriculaDiseno">Matrícula Diseño:</label>
          <input v-model="newMatricula.matricula_diseno" type="checkbox" id="newMatriculaDiseno">
        </div>

        <div class="form-group">
          <label for="newMatriculaDanza">Matrícula Danza:</label>
          <input v-model="newMatricula.matricula_danza" type="checkbox" id="newMatriculaDanza">
        </div>

        <button type="submit" class="add-btn">Agregar Matrícula</button>
      </form>

      <!-- Mensaje de matrícula exitosa -->
      <div v-if="matriculaExitosa" class="matricula-success-message">
        Matrícula exitosa
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      matriculas: [],
      newMatricula: {},
      editedMatricula: {},
      backend_server: 'http://127.0.0.1:3000',
      isEditDialogVisible: false,
      editedMatriculaIndex: -1,
      matriculaExitosa: false // Nueva propiedad
    };
  },
  methods: {
    addMatricula() {
      axios.post(`${this.backend_server}/matriculas`, this.newMatricula)
        .then(res => {
          this.matriculas.push(res.data);
          this.newMatricula = {};
          this.matriculaExitosa = true; // Mostrar mensaje
          setTimeout(() => {
            this.matriculaExitosa = false; // Ocultar mensaje después de 3 segundos (puedes ajustar el tiempo)
          }, 3000);
        })
        .catch(error => {
          console.error(error);
        });
    },
    redirectToOtraPagina() {
      // Coloca la lógica para redirigir a la otra página
      window.location.href = 'http://localhost:5173/index.html';
    },
  }
};
</script>

<style scoped>
.redirection-button {
  margin-left: 35px;
}

.matricula-success-message {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  margin-top: 10px;
  text-align: center;
}

.banner {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
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