import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Signup from '@/views/Signup';
import Exercise from '@/views/Exercise';
import { auth } from './firebaseInit';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        reuqiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/:id',
      name: 'Exercise',
      component: Exercise,
      props: true,
      meta: {
        reuqiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.reuqiresAuth)) {
    auth.onAuthStateChanged(user => {
      if (!user) next('/login');
      else next();
    });
  } else {
    if (auth.currentUser && (to.path === '/login' || to.path === '/signup'))
      next('/');
    else next();
  }
});

export default router;
