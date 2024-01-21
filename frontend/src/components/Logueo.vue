<template>
  <div class="banner">
    <div class="banner-content">
      <img src="https://mijaelparedes.site/img/logo3.png" alt="Logo Villa el Golf" class="logo">
      <h1>Colegio Villa el Golf</h1>
      <button class="redirection-button" onclick="location.href='http://localhost:5173/index.html'">Salir</button>
    </div>
  </div>
  <div class="login-container">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <label for="username">Usuario:</label>
      <input v-model="username" type="text" id="username" name="username" required>

      <label for="password">Contraseña:</label>
      <input v-model="password" type="password" id="password" name="password" required>

      <button type="submit">Iniciar Sesión</button>
      <button class="redirection-button2" onclick="location.href='http://localhost:5173/automatricula_alumno.html'">Nueva
        Matricula </button>
      <button class="redirection-button2" onclick="location.href='http://localhost:5173/moduloDocente.html'">Ingresar como
        Docente</button>



      <!-- Mostrar mensaje de error -->
      <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      backend_server: 'http://127.0.0.1:3000',
      errorMessage: '', // Nuevo dato para el mensaje de error
    };
  },
  methods: {
    async login() {
      try {
        const apiUrl = `${this.backend_server}/login`;
        const requestData = {
          cod_usuario: this.username,
          nombre_usuario: this.username,
          pass_usuario: this.password,
        };

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          // Redirige a la ruta específica
          window.location.href = 'http://localhost:5173/siagie.html';
        } else {
          // Actualiza el mensaje de error
          this.errorMessage = 'Error al iniciar sesión. Credenciales incorrectas.';
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        // Actualiza el mensaje de error en caso de error de red
        this.errorMessage = 'Error en la solicitud. Inténtalo de nuevo.';
      }
    },
    redirectToOtraPagina() {
      // Coloca la lógica para redirigir a la otra página
      window.location.href = 'http://localhost:5173/siagie.html';
    },
  },
};
</script>


<style scoped>
.redirection-button {
  margin-left: 35px;
  background-color: #075486;
  color: #fff;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  width: 150px;
}



.error-message {
  color: red;
  margin-top: 10px;
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

.redirection-button2 {
  margin: 10px auto;

}

.login-container {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 20px auto;
}

h1 {
  text-align: center;
  color: #333;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>