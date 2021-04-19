import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path(.*)',
            component: () =>
                import ('@/views/redirect/index')
        }]
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () =>
            import ('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            name: 'Dashboard',
            meta: {
                title: '主页',
                icon: 'dashboard',
                affix: true
            }
        }]
    },
    {
        path: '/template',
        component: Layout,
        meta: {
            title: '模板',
            icon: 'el-icon-document'
        },
        alwaysShow: true,
        children: [{
            path: 'tmp',
            component: () =>
                import ('@/views/template/index'),
            name: 'tempalte',
            meta: {
                title: '模板1',
                icon: 'el-icon-document',
                affix: true
            }
        }]
    },
    {
        path: '/icons',
        component: Layout,
        hidden: false,
        children: [{
            path: 'icons',
            component: () =>
                import ('@/views/icons/index'),
            name: 'Icons',
            meta: {
                title: '图标',
                icon: 'dashboard'
            }
        }]
    }
]

export const asyncRoutes = []

const createRouter = () => new Router({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router