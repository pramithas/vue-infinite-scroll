import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './vuetify/vuetify'

const app = createApp(App)

app.use(vuetify)
app.mount('#app')
