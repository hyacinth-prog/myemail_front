import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/Login'
import Home from '../components/home/home'
import EmailList from '../components/home/main/emailList'
import EditEmail from '../components/home/main/editEmail'
import EmailDrafts from '../components/home/main/emailDrafts'
import AddressList from '../components/home/main/addressList'

import EmailDetail from '../components/home/main/emailDetail'



import { message } from 'element-ui';


Vue.use(Router);




const router = new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,


        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: 'emailList',
                    component: EmailList,            
                },
                {
                    path: 'editEmail',
                    component: EditEmail
                },
                {
                    path: 'emailDrafts',
                    component: EmailDrafts
                },
                {
                    path: 'addressList',
                    component: AddressList
                },
                {
                    name:'detail',
                    path: 'emailDetail',
                    component: EmailDetail
                },

            ],

            meta: {
                // requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        },

    ]
});

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login')) {
        window.localStorage.removeItem('accessToken')
        window.localStorage.clear();
        next();
    } else {
        if (to.path === '/') {
            window.localStorage.removeItem('accessToken')
            next({ path: '/login' });

        }

        let token = window.localStorage.getItem('accessToken');
        if (!token) {
            message({
                message: '请先登录!',
                type: 'info',

            })
            //未登录跳回主页
            next({ path: '/login' });
        } else {
            next();
        }
    }
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router;
