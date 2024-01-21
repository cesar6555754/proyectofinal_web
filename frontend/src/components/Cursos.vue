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
      <h2>Cursos</h2>
      <input v-model="searchTerm" type="text" id="filtrar_datos">
      <button @click="generateReport" class="generate-report-btn">Buscar todos los datos</button><br><br>

      <ul>
        <li v-for="(curso, index) in cursos" :key="curso._id" class="user-item">
          <div class="curso-info">
            <span class="curso-property">Código:</span> {{ curso.cod_curso }}<br>
            <span class="curso-property">Nombre:</span> {{ curso.nombre_curso }}<br>
            <span class="curso-property">Vacantes:</span> {{ curso.vacantes }}<br>
            <span class="curso-property">Precio:</span> {{ curso.precio }}<br>
            <span class="curso-property">Horario:</span> {{ curso.horario }}<br>
            <span class="curso-property">Código Docente:</span> {{ curso.cod_docente }}
          </div>
          <div class="curso-buttons">
            <button @click="deleteCurso(curso._id)" class="delete-btn">Eliminar</button>
            <button @click="openEditDialog(curso, index)" class="edit-btn">Editar</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="column form-column">
      <form @submit.prevent="addCurso" class="add-curso-form">
        <h2>Nuevo Registro</h2>
        <div class="form-group">
          <label for="newCodCurso">Código de Curso:</label>
          <input v-model="newCurso.cod_curso" type="text" id="newCodCurso" required>
        </div>

        <div class="form-group">
          <label for="newNombreCurso">Nombre de Curso:</label>
          <input v-model="newCurso.nombre_curso" type="text" id="newNombreCurso" required>
        </div>

        <div class="form-group">
          <label for="newVacantes">Vacantes:</label>
          <input v-model="newCurso.vacantes" type="text" id="newVacantes" required>
        </div>

        <div class="form-group">
          <label for="newPrecio">Precio:</label>
          <input v-model="newCurso.precio" type="text" id="newPrecio" required>
        </div>

        <div class="form-group">
          <label for="newHorario">Horario:</label>
          <input v-model="newCurso.horario" type="text" id="newHorario" required>
        </div>

        <div class="form-group">
          <label for="newCodDocente">Código de Docente:</label>
          <input v-model="newCurso.cod_docente" type="text" id="newCodDocente" required>
        </div>

        <button type="submit" class="add-btn">Agregar Curso</button>
      </form>
    </div>

    <div v-if="isEditDialogVisible" class="edit-dialog">
      <div class="edit-dialog-content">
        <span @click="closeEditDialog" class="close">&times;</span>
        <h2>Editar Curso</h2>
        <form @submit.prevent="updateCurso">
          <div class="form-group">
            <label for="editCodCurso">Código de Curso:</label>
            <input v-model="editedCurso.cod_curso" type="text" id="editCodCurso" required>
          </div>

          <div class="form-group">
            <label for="editNombreCurso">Nombre de Curso:</label>
            <input v-model="editedCurso.nombre_curso" type="text" id="editNombreCurso" required>
          </div>

          <div class="form-group">
            <label for="editVacantes">Vacantes:</label>
            <input v-model="editedCurso.vacantes" type="text" id="editVacantes" required>
          </div>

          <div class="form-group">
            <label for="editPrecio">Precio:</label>
            <input v-model="editedCurso.precio" type="text" id="editPrecio" required>
          </div>

          <div class="form-group">
            <label for="editHorario">Horario:</label>
            <input v-model="editedCurso.horario" type="text" id="editHorario" required>
          </div>

          <div class="form-group">
            <label for="editCodDocente">Código de Docente:</label>
            <input v-model="editedCurso.cod_docente" type="text" id="editCodDocente" required>
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
      cursos: [],
      newCurso: {},
      editedCurso: {},
      backend_server: 'http://127.0.0.1:3000',
      isEditDialogVisible: false,
      editedCursoIndex: -1,
      searchTerm: '' // Nuevo dato para el término de búsqueda
    };
  },
  methods: {
    addCurso() {
      axios.post(`${this.backend_server}/cursos`, this.newCurso)
        .then(res => {
          this.cursos.push(res.data);
          this.newCurso = {};
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteCurso(cursoId) {
      axios.delete(`${this.backend_server}/cursos/${cursoId}`)
        .then(() => {
          this.cursos = this.cursos.filter(c => c._id !== cursoId);
        })
        .catch(error => {
          console.error(error);
        });
    },
    openEditDialog(curso, index) {
      // Abre el diálogo de edición y copia los datos del curso seleccionado
      this.editedCurso = { ...curso };
      this.editedCursoIndex = index;
      this.isEditDialogVisible = true;
    },
    closeEditDialog() {
      // Cierra el diálogo de edición y limpia el objeto editedCurso
      this.isEditDialogVisible = false;
      this.editedCurso = {};
      this.editedCursoIndex = -1;
    },
    updateCurso() {
      axios.put(`${this.backend_server}/cursos/${this.editedCurso._id}`, this.editedCurso)
        .then(() => {
          // Actualiza la lista de cursos después de la edición
          if (this.editedCursoIndex !== -1 && this.cursos[this.editedCursoIndex]) {
            // Copia los datos editados al curso correspondiente
            Object.assign(this.cursos[this.editedCursoIndex], this.editedCurso);
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
        // Si no se proporciona un cod_curso, muestra el reporte de todos los cursos
        this.loadAllCursos();
      } else {
        // Filtra los cursos según el término de búsqueda
        const filteredCursos = this.cursos.filter(curso => {
          // Filtra por cod_curso
          return curso.cod_curso.toLowerCase().includes(searchTerm);
        });

        // Actualiza la lista de cursos con los resultados filtrados
        this.cursos = filteredCursos;
      }
    },

    // Método para cargar todos los cursos
    loadAllCursos() {
      axios.get(`${this.backend_server}/cursos`)
        .then(res => {
          this.cursos = res.data;
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