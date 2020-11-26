import Vue from 'vue'
import Router from 'vue-router'
// import Register from '@/componenets/Register.vue'
// import Login from '@/componenets/Login.vue'

Vue.use(Router)

// 完整路由代码
export default new Router({
    routes: [

        {
            path: '/',
            component:() => import('@/components/Login.vue')
            
        },
        {
            path: '/login',
            component:() => import('@/components/Login.vue')
            
        },
        {
            path: '/register',
            component:() => import('@/components/Register.vue')
        },
        {
            path: '/Main',
            component: () =>
                import ('@/views/Main'),
            children: [{
                    path: '/',
                    name: 'home',
                    component: () =>
                        import ('@/views/Home/Home'),
                },
                {
                    path: '/user',
                    name: 'user',
                    component: () =>
                        import ('@/views/UserManage/UserManage'),
                },
                {
                    path: '/persanalCenter',
                    name: 'persanalCenter',
                    component: () =>
                        import ('@/views/UserManage/PersonalCenter'),
                },
            ]
        }
    ]
})