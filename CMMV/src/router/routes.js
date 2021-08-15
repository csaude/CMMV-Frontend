const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
<<<<<<< HEAD
      { path: '', component: () => import('pages/Reschedule.vue') }
=======
        {
            path: '',
            component: () => import('src/pages/Index.vue')
        },
        {
            path: '/home',
            component: () => import('pages/Home.vue')
        },
        {
            path: '/login',
            component: () => import('pages/Login.vue')
        }
>>>>>>> 9bf9b3dfe4d1ca4c9c264bd95ba99d6d07aa3bd0
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
