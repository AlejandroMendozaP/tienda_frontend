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
