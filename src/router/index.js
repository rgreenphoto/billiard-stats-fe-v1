import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/pages/Home.vue';
import Login from '@/components/auth/Login.vue';
import Logout from '@/components/auth/Logout.vue';
import Register from '@/components/auth/Register.vue';
import AppInit from '@/guards/AppInit';
import RedirectIfLoggedIn from '@/guards/RedirectIfLoggedIn';
import IsLoggedIn from '@/guards/IsLoggedIn';
import FormatList from '@/components/formats/FormatList';
import AddMatch from '@/components/matches/AddMatch';
import AddUserMatch from '@/components/user_matches/AddUserMatch';
import SelectOpponent from '@/components/user_matches/SelectOpponent';
import ViewMatches from '@/components/matches/ViewMatches';
import AdvancedCharts from '@/components/pages/AdvancedCharts';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Home,
    beforeEnter: IsLoggedIn,
  },
  {
    path: '/login',
    component: Login,
    beforeEnter: RedirectIfLoggedIn,
  },
  {
    path: '/logout',
    component: Logout,
    beforeEnter: IsLoggedIn,
  },
  {
    path: '/register',
    component: Register,
    beforeEnter: RedirectIfLoggedIn,
  },
  {
    path: '/formats',
    component: FormatList,
    beforeEnter: IsLoggedIn,
  },
  {
    path: '/add-match',
    component: AddMatch,
    beforeEnter: IsLoggedIn,
  },
  {
    path: '/add-user-match',
    component: AddUserMatch,
    beforeEnter: IsLoggedIn,
    props: true,
  },
  {
    path: '/select-opponent',
    component: SelectOpponent,
    beforeEnter: IsLoggedIn,
  },
  {
    path: '/view-matches',
    component: ViewMatches,
    beforeEnter: IsLoggedIn,
  },
  {
    path: '/advanced-charts',
    component: AdvancedCharts,
    beforeEach: IsLoggedIn,
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(AppInit);

export default router
