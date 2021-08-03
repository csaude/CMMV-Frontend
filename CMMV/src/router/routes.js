
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
<<<<<<< HEAD
      { path: '', component: () => import('pages/SearchSanitaryUnit.vue') }
=======
      { path: '', component: () => import('pages/Home.vue') }
>>>>>>> e245b2dffb4e9d2a6a8e475885ad73683fc328af
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
