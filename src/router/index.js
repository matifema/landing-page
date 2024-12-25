import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/links',
      name: 'links',
      component: () => import('../components/LinkList.vue')
    },
    {
      path: "/gameoflife",
      name: "gameoflife",
      component: () => import('../components/GameOfLife.vue')
    },
    {
      path: '/tracklistify',
      name: 'tracklistify',
      component: () => import('../components/TrackListify.vue')
    },
    {
      path: '/tracklistify/callback',
      component: () => import('../components/SpotifyCallback.vue')
    },
    {
      path: '/links/addlinks',
      component: () => import('../views/AddLinkView.vue')
    },
    {
      path: '/cw',
      component: () => import('../views/CrosswordView.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import('../components/NotFound.vue')
    }
  ]
})

export default router
