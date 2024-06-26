require('./bootstrap');


import {createApp} from 'vue';
import {store} from './store/store';
import Departments from './components/Departments.vue';
import LogoutComponent from './components/auth/LogoutComponent.vue';
import PermissionsCreate from './components/permissions/PermissionsCreate.vue';
import Users from './components/users/Users.vue';
import Tasks from './components/tasks/Tasks.vue';
import Inbox from './components/tasks/Inbox.vue';

import Form from 'vform'
window.Form = Form;

var Emitter = require('tiny-emitter')
window.emitter = new Emitter();

import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

import Swal from 'sweetalert2';
window.Swal = Swal;

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  window.Toast = Toast;

const app = createApp({})

app.component('logout-component', LogoutComponent);
app.component('departments', Departments);
app.component('permissions-create', PermissionsCreate);
app.component('multi-select', Multiselect);
app.component('users', Users);
app.component('tasks', Tasks);
app.component('inbox', Inbox);

window.url = '/cwc-hrmis/'

app.use(store);

app.mount('#app')