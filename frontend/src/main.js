import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AppCurso from './AppCurso.vue'
import AppAlumno from './AppAlumno.vue'
import AppMatricula from './AppMatricula.vue'
import AppAutoMatricula from './AppAutoMatricula.vue'
import AppLogueo from './AppLogueo.vue'
import AppDocente from './AppDocente.vue'



createApp(AppDocente).mount('#appdocentes')
createApp(App).mount('#app')
createApp(AppCurso).mount('#appcurso')
createApp(AppAlumno).mount('#appalumno')
createApp(AppMatricula).mount('#appmatricula')
createApp(AppAutoMatricula).mount('#appautomatricula')
createApp(AppLogueo).mount('#applogueo')






