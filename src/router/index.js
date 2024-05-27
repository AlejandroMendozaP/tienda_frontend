import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Padre',
    children: [
      {
        path: '/',
        name: 'Madre',
        component: () => import('@/views/AppWrapper.vue'),
        children: [
          {
            path: '/',
            name: 'Main',
            component: () => import('@/views/HomeView.vue')
          },
          {
            path: '/contact', // Define la ruta de la página de contacto
            name: 'Contact', // Nombre de la ruta
            component: () => import('@/views/ContactView.vue') // Componente asociado a la página de contacto
          },
          {
            path: '/products', // Define la ruta de la página de contacto
            name: 'Products', // Nombre de la ruta
            component: () => import('@/views/ProductView.vue'), // Componente asociado a la página de contacto
          },
          {
            path: '/products/:id', // La parte ":id" indica que esta parte de la ruta será dinámica y representará el ID del producto
            name: 'ProductDetail', // Nombre de la ruta
            component: () => import('@/views/ProductDetailView.vue'), // Componente asociado a la vista de detalle del producto
            props: true // Habilita el paso de props al componente de la vista de detalle del producto
          },
          {
            path: '/login', // Define la ruta de la página de contacto
            name: 'Login', // Nombre de la ruta
            component: () => import('@/views/LoginView.vue') // Componente asociado a la página de contacto
          },
          {
            path: '/register', // Define la ruta de la página de contacto
            name: 'Register', // Nombre de la ruta
            component: () => import('@/views/RegisterView.vue') // Componente asociado a la página de contacto
          },
          {
            path: '/profile', // Define la ruta de la página de contacto
            name: 'Profile', // Nombre de la ruta
            component: () => import('@/views/ProfileView.vue')
          },
          {
            path: '/cart', // Define la ruta de la página de contacto
            name: 'Cart', // Nombre de la ruta
            component: () => import('@/views/CartView.vue')
          },
          {
            path: '/checkout', // Define la ruta de la página de contacto
            name: 'Checkout', // Nombre de la ruta
            component: () => import('@/views/CheckoutView.vue')
          }
        ]
      },
      {
        path: '/admin', // Define la ruta de la página de contacto
        name: 'Admin', // Nombre de la ruta
        component: () => import('@/views/AdminView.vue'),
        meta: { requiresAdmin: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!store.getters.isAdmin) {
      alert('You do not have permission to access this page.');
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
