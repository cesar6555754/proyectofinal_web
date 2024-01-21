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
      <h2>Matrículas</h2>
      <input v-model="searchTerm" type="text" id="filtrar_datos">
      <button @click="generateReport" class="generate-report-btn">Buscar todas las matrículas</button><br><br>

      <ul>
        <li v-for="(matricula, index) in matriculas" :key="matricula._id" class="user-item">
          <div class="matricula-info">
            <span class="matricula-property">Código:</span> {{ matricula.cod_matricula }}<br>
            <span class="matricula-property">Nombre del Alumno:</span> {{ matricula.nombre_alumno }}<br>
            <span class="matricula-property">Código de Boucher:</span> {{ matricula.codigo_boucher }}<br>
            <span class="matricula-property">Matrícula Matemática:</span> {{ matricula.matricula_matematica ? 'Sí' : 'No'
            }}<br>
            <span class="matricula-property">Matrícula Inglés:</span> {{ matricula.matricula_ingles ? 'Sí' : 'No' }}<br>
            <span class="matricula-property">Matrícula Diseño:</span> {{ matricula.matricula_diseno ? 'Sí' : 'No' }}<br>
            <span class="matricula-property">Matrícula Danza:</span> {{ matricula.matricula_danza ? 'Sí' : 'No' }}<br>
          </div>
          <div class="matricula-buttons">
            <button @click="deleteMatricula(matricula._id)" class="delete-btn">Eliminar</button>
            <button @click="openEditDialog(matricula, index)" class="edit-btn">Editar</button>
          </div>
        </li>
      </ul>
    </div>

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
    </div>

    <div v-if="isEditDialogVisible" class="edit-dialog">
      <div class="edit-dialog-content">
        <span @click="closeEditDialog" class="close">&times;</span>
        <h2>Editar Matrícula</h2>
        <form @submit.prevent="updateMatricula">
          <div class="form-group">
            <label for="editCodMatricula">Código de Matrícula:</label>
            <input v-model="editedMatricula.cod_matricula" type="text" id="editCodMatricula" required>
          </div>

          <div class="form-group">
            <label for="editNombreAlumno">Nombre del Alumno:</label>
            <input v-model="editedMatricula.nombre_alumno" type="text" id="editNombreAlumno" required>
          </div>

          <div class="form-group">
            <label for="editCodigoBoucher">Código de Boucher:</label>
            <input v-model="editedMatricula.codigo_boucher" type="text" id="editCodigoBoucher" required>
          </div>

          <div class="form-group">
            <label for="editMatriculaMatematica">Matrícula Matemática:</label>
            <input v-model="editedMatricula.matricula_matematica" type="checkbox" id="editMatriculaMatematica">
          </div>

          <div class="form-group">
            <label for="editMatriculaIngles">Matrícula Inglés:</label>
            <input v-model="editedMatricula.matricula_ingles" type="checkbox" id="editMatriculaIngles">
          </div>

          <div class="form-group">
            <label for="editMatriculaDiseno">Matrícula Diseño:</label>
            <input v-model="editedMatricula.matricula_diseno" type="checkbox" id="editMatriculaDiseno">
          </div>

          <div class="form-group">
            <label for="editMatriculaDanza">Matrícula Danza:</label>
            <input v-model="editedMatricula.matricula_danza" type="checkbox" id="editMatriculaDanza">
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
      matriculas: [],
      newMatricula: {},
      editedMatricula: {},
      backend_server: 'http://127.0.0.1:3000',
      isEditDialogVisible: false,
      editedMatriculaIndex: -1,
      searchTerm: '' // Nuevo dato para el término de búsqueda
    };
  },
  methods: {
    addMatricula() {
      axios.post(`${this.backend_server}/matriculas`, this.newMatricula)
        .then(res => {
          this.matriculas.push(res.data);
          this.newMatricula = {};
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteMatricula(matriculaId) {
      axios.delete(`${this.backend_server}/matriculas/${matriculaId}`)
        .then(() => {
          this.matriculas = this.matriculas.filter(m => m._id !== matriculaId);
        })
        .catch(error => {
          console.error(error);
        });
    },
    openEditDialog(matricula, index) {
      // Abre el diálogo de edición y copia los datos de la matrícula seleccionada
      this.editedMatricula = { ...matricula };
      this.editedMatriculaIndex = index;
      this.isEditDialogVisible = true;
    },
    closeEditDialog() {
      // Cierra el diálogo de edición y limpia el objeto editedMatricula
      this.isEditDialogVisible = false;
      this.editedMatricula = {};
      this.editedMatriculaIndex = -1;
    },
    updateMatricula() {
      axios.put(`${this.backend_server}/matriculas/${this.editedMatricula._id}`, this.editedMatricula)
        .then(() => {
          // Actualiza la lista de matrículas después de la edición
          if (this.editedMatriculaIndex !== -1 && this.matriculas[this.editedMatriculaIndex]) {
            // Copia los datos editados a la matrícula correspondiente
            Object.assign(this.matriculas[this.editedMatriculaIndex], this.editedMatricula);
          }

          // Cierra el diálogo de edición
          this.closeEditDialog();
        })
        .catch(error => {
          console.error(error);
        });
    },
    generateReport() {
      // Obtén el valor del campo de búsqueda
      const searchTerm = this.searchTerm.toLowerCase();

      if (searchTerm.trim() === '') {
        // Si no se proporciona un cod_matricula, muestra el reporte de todas las matrículas
        this.loadAllMatriculas();
      } else {
        // Filtra las matrículas según el término de búsqueda
        const filteredMatriculas = this.matriculas.filter(matricula => {
          // Filtra por cod_matricula y nombre_alumno
          return matricula.cod_matricula.toLowerCase().includes(searchTerm) ||
            matricula.nombre_alumno.toLowerCase().includes(searchTerm);
        });

        // Actualiza la lista de matrículas con los resultados filtrados
        this.matriculas = filteredMatriculas;
      }
    },

    // Método para cargar todas las matrículas
    loadAllMatriculas() {
      axios.get(`${this.backend_server}/matriculas`)
        .then(res => {
          this.matriculas = res.data;
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
.redirection-button {
  margin-left: 35px;
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