<template>
  <div class="banner">
    <div class="banner-content">
      <img src="https://mijaelparedes.site/img/logo3.png" alt="Logo Villa el Golf" class="logo">
      <h1>Colegio Villa el Golf</h1>
      <button @click="redirectToOtraPagina" class="redirection-button">Menú principal</button>

    </div>
  </div>
  <div class="container">
    <div class="column report-column">
      <h2>Docentes</h2>
      <input v-model="searchTerm" type="text" id="filtrar_datos">
      <button @click="generateReport" class="generate-report-btn">Buscar todos los docentes</button><br><br>

      <ul>
        <li v-for="(docente, index) in docentes" :key="docente._id" class="user-item">
          <div class="user-info">
            <span class="user-property">Código:</span> {{ docente.cod_docente }}<br>
            <span class="user-property">Nombre:</span> {{ docente.nombre_docente }}<br>
            <span class="user-property">Edad:</span> {{ docente.edad_docente }}<br>
            <span class="user-property">Especialidad:</span> {{ docente.especialidad_docente }}<br>
            <span class="user-property">Tipo de usuario:</span> {{ docente.tipo_usuario }}<br>
          </div>
          <div class="user-buttons">
            <button @click="deleteUser(docente._id)" class="delete-btn">Eliminar</button>
            <button @click="openEditDialog(docente, index)" class="edit-btn">Editar</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="column form-column">
      <form @submit.prevent="addUser" class="add-user-form">
        <h2>Nuevo Registro</h2>
        <div class="form-group">
          <label for="newCodUsuario">Código de Docente:</label>
          <input v-model="newUser.cod_docente" type="text" id="newCodUsuario" required>
        </div>

        <div class="form-group">
          <label for="newNombreUsuario">Nombre de Docente:</label>
          <input v-model="newUser.nombre_docente" type="text" id="newNombreUsuario" required>
        </div>

        <div class="form-group">
          <label for="newEdadDocente">Edad de Docente:</label>
          <input v-model="newUser.edad_docente" type="text" id="newEdadDocente" required>
        </div>

        <div class="form-group">
          <label for="newEspecialidadDocente">Especialidad de Docente:</label>
          <input v-model="newUser.especialidad_docente" type="text" id="newEspecialidadDocente" required>
        </div>

        <div class="form-group">
          <label for="newTipoUsuario">Tipo de Usuario:</label>
          <input v-model="newUser.tipo_usuario" type="text" id="newTipoUsuario" required>
        </div>

        <button type="submit" class="add-btn">Agregar Docente</button>
      </form>
    </div>

    <div v-if="isEditDialogVisible" class="edit-dialog">
      <div class="edit-dialog-content">
        <span @click="closeEditDialog" class="close">&times;</span>
        <h2>Editar Docente</h2>
        <form @submit.prevent="updateUser">
          <div class="form-group">
            <label for="editCodUsuario">Código de Docente:</label>
            <input v-model="editedUser.cod_docente" type="text" id="editCodUsuario" required>
          </div>

          <div class="form-group">
            <label for="editNombreUsuario">Nombre de Docente:</label>
            <input v-model="editedUser.nombre_docente" type="text" id="editNombreUsuario" required>
          </div>

          <div class="form-group">
            <label for="editPassUsuario">Edad de Docente:</label>
            <input v-model="editedUser.edad_docente" type="text" id="editPassUsuario" required>
          </div>

          <div class="form-group">
            <label for="editEspecialidad">Especialidad Docente:</label>
            <input v-model="editedUser.especialidad_docente" type="text" id="editEspecialidad" required>
          </div>
          <div class="form-group">
            <label for="editTipoUsuario">Tipo Usuario:</label>
            <input v-model="editedUser.tipo_usuario" type="text" id="editTipoUsuario" required>
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
      docentes: [],
      newUser: {},
      editedUser: {},
      backend_server: 'http://127.0.0.1:3000',
      isEditDialogVisible: false,
      editedUserIndex: -1,
      searchTerm: '' // Nuevo dato para el término de búsqueda
    };
  },
  methods: {
    addUser() {
      axios.post(`${this.backend_server}/docentes`, this.newUser)
        .then(res => {
          this.docentes.push(res.data);
          this.newUser = {};
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteUser(userId) {
      axios.delete(`${this.backend_server}/docentes/${userId}`)
        .then(() => {
          this.docentes = this.docentes.filter(u => u._id !== userId);
        })
        .catch(error => {
          console.error(error);
        });
    },
    openEditDialog(docente, index) {
      // Abre el diálogo de edición y copia los datos del usuario seleccionado
      this.editedUser = { ...docente };
      this.editedUserIndex = index;
      this.isEditDialogVisible = true;
    },
    closeEditDialog() {
      // Cierra el diálogo de edición y limpia el objeto editedUser
      this.isEditDialogVisible = false;
      this.editedUser = {};
      this.editedUserIndex = -1;
    },
    updateUser() {
      axios.put(`${this.backend_server}/docentes/${this.editedUser._id}`, this.editedUser)
        .then(() => {
          // Actualiza la lista de usuarios después de la edición
          if (this.editedUserIndex !== -1 && this.docentes[this.editedUserIndex]) {
            // Copia los datos editados al usuario correspondiente
            Object.assign(this.docentes[this.editedUserIndex], this.editedUser);
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
        // Si no se proporciona un cod_docente, muestra el reporte de todos los docentes
        this.loadAllDocentes();
      } else {
        // Filtra los docentes según el término de búsqueda
        const filteredDocentes = this.docentes.filter(docente => {
          // Filtra por cod_docente
          return docente.cod_docente.toLowerCase().includes(searchTerm);
        });

        // Actualiza la lista de docentes con los resultados filtrados
        this.docentes = filteredDocentes;
      }
    },

    // Método para cargar todos los docentes
    loadAllDocentes() {
      axios.get(`${this.backend_server}/docentes`)
        .then(res => {
          this.docentes = res.data;
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