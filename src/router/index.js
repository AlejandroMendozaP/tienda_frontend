import { createRouter, createWebHistory } from 'vue-router'

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
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
