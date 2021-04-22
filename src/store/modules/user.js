import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
/* Layout */
import Layout from '@/layout'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    btns: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_BTNS: (state, btns) => {
        state.btns = btns
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                response = {
                    'data': {
                        'avatar': "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
                        'introduction': "I am a super administrator",
                        'name': "Super Admin",
                        'roles': ["admin"],
                        'menus': [{
                                path: '/demo', //一级菜单路径  '/'开头
                                component: Layout, // 布局组件  定值'Layout'
                                hidden: false, // 是否在侧边栏显示 true不显示 false  显示
                                // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
                                alwaysShow: true, //
                                meta: {
                                    title: '客户管理', //该路由在侧边栏和面包屑中展示的名字
                                    icon: 'icon' //路由的图标
                                },
                                children: [{ //二级菜单
                                        path: 'demo1', //二级菜单路径  不要以'/'开头
                                        component: () =>
                                            import ('@/views/demo/demo1/index'), // 二级菜单组件  
                                        name: 'demo1', //路由的名字 与index页面名称一致
                                        meta: {
                                            title: '客户信息维护', //该路由在侧边栏和面包屑中展示的名字
                                            icon: 'icon' //路由的图标
                                        }
                                    },
                                    {
                                        path: 'demo2', //二级菜单路径  不要以'/'开头
                                        component: () =>
                                            import ('@/views/demo/demo2/index'), // 二级菜单组件  
                                        name: 'demo2', //路由的名字 与index页面名称一致
                                        meta: {
                                            title: '公司主体', //该路由在侧边栏和面包屑中展示的名字
                                            icon: 'icon' //路由的图标
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
                                        alwaysShow: true,
                                        meta: {
                                            title: '客户信息维护11',
                                            icon: 'icon'
                                        },
                                        children: [{
                                            path: 'bbb',
                                            component: () =>
                                                import ('@/views/aa/demo1/demo1-2/index'),
                                            name: 'demo1-2',
                                            alwaysShow: false,
                                            meta: { title: 'demo1-2', icon: 'icon' }
                                        }]
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
                        ],
                        'btns': {
                            'demo1': ['update', 'statusClose', 'ooo', 'query', 'add', 'reset', 'see', 'tj']
                        }
                    }
                }
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { roles, name, avatar, introduction, btns } = data

                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                commit('SET_ROLES', roles)
                commit('SET_BTNS', btns)
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                commit('SET_INTRODUCTION', introduction)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()
                dispatch('tagsView/delAllViews', null, { root: true })
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    // dynamically modify permissions
    async changeZone({ commit, dispatch }, role) {
        const token = role + '-token'
        commit('SET_TOKEN', token)
        setToken(token)
        let { roles, menus } = await dispatch('getInfo')
        resetRouter()
        menus = [{
                path: '/demo',
                component: Layout,
                name: 'demo',
                meta: {
                    title: '客户管理',
                    icon: 'icon'
                },
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
            },
            // 404 page must be placed at the end !!!
            {
                path: '*',
                redirect: '/404',
                hidden: true
            }
        ]
        const accessRoutes = await dispatch('permission/generateRoutes', { roles, menus }, { root: true })
        router.addRoutes(accessRoutes)
        dispatch('tagsView/delAllViews', null, { root: true })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}