import Vue from 'vue'
import VueRouter from 'vue-router'
import log from './middleware/log'
// import auth from './middleware/auth'
// import store from '../store/index'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const Login = () => import(/* webpackChunkName: "static/js/chunks/Auth/Login" */'../views/Login')
const Dashboard = () => import(/* webpackChunkName: "static/js/chunks//Dashboard" */'../views/Dashboard')

const routes = [
    {
        path: '/login',
        component: Login,
        name: 'Login'
    },
    {
        path: '/',
        component: Dashboard,
        name: 'Dashboard',
        meta: {
            layout: 'main'
        }
    },
    {
        path: '*',
        redirect: '/'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index]
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next

    return (...parameters) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters)
        // Then run the subsequent Middleware with a new
        // `nextMiddleware()` callback.
        const nextMiddleware = nextFactory(context, middleware, index + 1)
        subsequentMiddleware({...context, next: nextMiddleware})
    }
}

router.beforeEach((to, from, next) => {
    const middleware = [log]
    if (middleware) {
        Array.isArray(to.meta.middleware) ? middleware.push(...to.meta.middleware) : middleware.push(to.meta.middleware)
    }
    const context = {
        from,
        next,
        router,
        to
    }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({...context, next: nextMiddleware})
})

export default router
