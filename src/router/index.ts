import Vue from 'vue';
import VueRouter from 'vue-router';
import InicioSesion from '@/components/InicioSesion.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'InicioSesion',
    component: InicioSesion,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: () => import('../views/Clientes.vue'),
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
