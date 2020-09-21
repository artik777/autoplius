import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import fb from 'firebase/app'
import 'firebase/auth'
import secret from './secret.js'

Vue.config.productionTip = false

fb.initializeApp({
  apiKey: secret.apiKey,
  authDomain: secret.authDomain,
  databaseURL: secret.databaseURL,
  projectId: secret.projectId,
  storageBucket: secret.storageBucket,
  messagingSenderId: secret.messagingSenderId,
  appId: secret.appId
})

let app

fb.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app')
  }
})
