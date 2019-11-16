import Vue from 'vue';
import VueRouter from 'vue-router';
import InicioSesion from '@/components/InicioSesion.vue';
import Empresa from '@/views/empresa/Empresa.vue';


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
    component: () => import('../components/clientes/ClientesListado.vue'),
  },
  {
    path: '/clientes/:action',
    name: 'clientes_crear',
    component: () => import('../components/clientes/ClientesCrear.vue'),
  },
  {
    path: '/clientes/:action/:id',
    name: 'clientes_editar',
    component: () => import('../components/clientes/ClientesCrear.vue'),
  },
  {
    path: '/empresa',
    name: 'empresa',
    component: Empresa,
  },
  {
    path: '/servicios',
    name: 'servicios',
    component: () => import('../components/servicios/ServiciosListado.vue'),
  },
  {
    path: '/servicios/:action',
    name: 'servicios_crear',
    component: () => import('../components/servicios/ServiciosCrear.vue'),
  },
  {
    path: '/servicios/:action/:id',
    name: 'servicios_editar',
    component: () => import('../components/servicios/ServiciosCrear.vue'),
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
