import 'bulma/css/bulma.css' 
// Imports Bulma
import '@fortawesome/fontawesome-free/css/all.css'
// Imports the free font-aweseome icons
import Oruga from '@oruga-ui/oruga-next';
// Oruga

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Oruga)
app.use(router)

app.mount('#app')