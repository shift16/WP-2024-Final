import 'bulma/css/bulma.css' // Imports the minified bulma file
import '@fortawesome/fontawesome-free/css/all.css' // Imports the free font-aweseome icons

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
