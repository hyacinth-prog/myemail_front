export default {
    state: {
        i:0,
        list:[]

    },
    getters: {
        getEmailList: state=>state
    },
    mutations: {
        SET_EMAIL_LIST(state, data) {
            state.list = Object.assign(state.list, JSON.parse(JSON.stringify(data)))
            //localStorage.setItem('emailList', JSON.stringify(data))
        }

    },
    actions: {
        async updateEmail({ commit, dispatch, rootState }, data) {
            commit('SET_EMAIL_LIST', data)
          
            // await dispatch('updateProject', rootState.projects.project)
        }
    }
}