export default {
    state: {

        email: {
            account: '',
            authCode: ''

        },
        accountList:[]

    },
    getters: {
        getHome: state => state
    },
    mutations: {
        SET_EMAIL(state, data) {
            state.email = Object.assign(state.email, data)
        },
        SET_ACCOUNT_LIST(state, data) {
            state.accountList = Object.assign(state.accountList, JSON.parse(JSON.stringify(data)))
        }

    },
    actions: {
        async updateEmail({ commit, dispatch, rootState }, data) {
            commit('SET_EMAIL', data)
            // await dispatch('updateProject', rootState.projects.project)
        },
        async updateAccountList({ commit, dispatch, rootState }, data) {
            commit('SET_ACCOUNT_LIST', data)
            // await dispatch('updateProject', rootState.projects.project)
        }

    }
}