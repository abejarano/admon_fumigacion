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
    component: () => import('../views/clientes_listado/ClientesListado.vue'),
  },
  {
    path: '/clientes/:action',
    name: 'clientes_crear',
    component: () => import('../views/clientes_crear/ClientesCrear.vue'),
  },
  {
    path: '/clientes/:action/:id',
    name: 'clientes_editar',
    component: () => import('../views/clientes_crear/ClientesCrear.vue'),
  },
  {
    path: '/empresa',
    name: 'empresa',
    component: () => import('../views/Empresa.vue'),
  },
  {
    path: '/servicios',
    name: 'servicios',
    component: () => import('../views/servicios_listado/ServiciosListado.vue'),
  },
  {
    path: '/servicios/:action',
    name: 'servicios_crear',
    component: () => import('../views/ServiciosCrear.vue'),
  },
  {
    path: '/servicios/:action/:id',
    name: 'servicios_editar',
    component: () => import('../views/ServiciosCrear.vue'),
  },
  {
    path: '/presupuestos/:action',
    name: 'presupuesto_crear',
    component: () => import('../views/presupuesto_crear/PresupuestoCrear.vue'),
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
