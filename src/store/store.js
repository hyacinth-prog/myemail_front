import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import emailList from './modules/emailList'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home,
        emailList
    },
    state: {
        // 存储token
        Authorization: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : ''
    },
    mutations: {
        // 修改token，并将token存入localStorage
        changeLogin(state, user) {
            state.Authorization = user.Authorization;
            localStorage.setItem('accessToken', user.Authorization);
        }
    }

})