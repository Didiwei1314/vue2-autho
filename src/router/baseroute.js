
import Login from '@/components/login/Login'
export default [
  {
    path:'/',
    hide: true,
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    hide: true,
    component: Login
  }
]