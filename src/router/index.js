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
                title: 'Dashboard',
                icon: 'dashboard',
                affix: true
            }
        }]
    }
]

export const asyncRoutes = [{
        path: '/demo',
        component: Layout,
        name: 'demo',
        meta: {
            title: '客户管理',
            icon: 'icon'
        },
        redirect: '/demo/demo1',
        alwaysShow: true,
        children: [{
                path: 'demo1',
                component: () =>
                    import ('@/views/demo/demo1/index'),
                name: 'demo1',
                meta: {
                    title: '客户信息维护',
                    icon: 'icon'
                }
            },
            {
                path: 'demo2',
                component: () =>
                    import ('@/views/demo/demo2/index'),
                name: 'demo2',
                meta: {
                    title: '公司主体',
                    icon: 'icon'
                }
            }
        ]
    }, {
        path: '/aa',
        component: Layout,
        name: 'aa',
        meta: {
            title: '客户管理222',
            icon: 'icon'
        },
        alwaysShow: true,
        children: [{
                path: 'bb',
                component: () =>
                    import ('@/views/aa/demo1/index'),
                name: 'demo3',
                meta: {
                    title: '客户信息维护11',
                    icon: 'icon'
                }
            },
            {
                path: 'cc',
                component: () =>
                    import ('@/views/aa/demo2/index'),
                name: 'demo4',
                meta: {
                    title: '公司主体4354',
                    icon: 'icon'
                }
            }
        ]
    },
    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

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