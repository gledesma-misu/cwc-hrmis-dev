require('./bootstrap');


import {createApp} from 'vue';
import {store} from './store/store';
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';
import Departments from './components/Departments.vue';
import Users from './components/users/Users.vue';
import PermissionsCreate from './components/permissions/PermissionsCreate.vue';

import Form from 'vform'
window.Form = Form;
const app = createApp({})

app.component('departments', Departments);
app.component('users', Users);
app.component('permissions-create', PermissionsCreate);
app.component('multi-select', Multiselect);

window.url = '/cwc-hrmis/'

app.use(store);

app.mount('#app')