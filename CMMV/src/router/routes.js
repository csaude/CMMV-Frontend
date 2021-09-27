const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
        { path: '', component: () => import('src/pages/Index.vue') }
    ]
  },
  {
    path: '/mobilizerHome/:id',
    component: () => import('components/CommunityMobilizer/MainPage'),
    children: [
  ]
  },
  {
    path: '/clinicHome/:id',
    component: () => import('src/pages/ClinicPage.vue'),
    children: [
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
