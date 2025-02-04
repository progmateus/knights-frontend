import { createRouter, createWebHistory } from 'vue-router'

import KnightsListView from '../views/KnightsList.vue'
import CreateKnightView from '../views/CreateKnightView.vue'
import KinghtProfile from '../views/KnightProfile.vue'


const routes = [
  {
    path: "/",
    component: KnightsListView
  },
  {
    path: "/create",
    component: CreateKnightView
  },
  {
    path: "/:id",
    component: KinghtProfile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router