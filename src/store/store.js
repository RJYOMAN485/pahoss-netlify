// import repository from "../pages/api/repository";


const state = {
  userDetails : {
    id: null,
    name: null,
    email: null,
    roles: null


  },

  // userDetails : {
  //   id: '18',
  //   name: 'dummy',
  //   email: 'ujjali485@gmail.com',
  //   roles: 'user'


  // },
  errorMessage: null,
  activeLisence: [],
  expiredLisence: [],
  pendingLisence: [],
  loading: false,
  // user: sessionStorage.user ? JSON.parse(sessionStorage.getItem('user')) : null,
  authenticated:'',
  APP_URL: 'http://127.0.0.1:8000/api/'

}

const mutations = {
  setUserDetails(state,payload) {
    state.userDetails = payload
  },
  setError(state,payload) {
    state.errorMessage = payload
  },
  setActiveLisence(state,payload) {
    state.activeLisence = payload
  },
  setExpiredLisence(state,payload) {
    state.expiredLisence = payload
  },
  setPendingLisence(state,payload) {
    state.pendingLisence = payload
  },
  setLoading(state,payload) {
    state.loading = payload;
  },
  SET_USER(state, user) {
    state.user = user;
  }


}

const getters = {
  user: state => state.user,
  APP_URL: state => state.APP_URL,
  authenticated: state => state.user !== null,
}

const actions = {

  

  loginUser({commit,dispatch},payload) {
      
    dispatch('loading',true)
    
    commit('setUserDetails',payload)
    
  },
  
  logoutUser() {
    firebaseAuth.signOut();
  },
  activeLisence({commit},payload) {
    commit('setActiveLisence',payload)
  },
  expiredLisence({commit},payload) {
    commit('setExpiredLisence',payload)
  },
  pendingLisence({commit},payload) {
    commit('setPendingLisence',payload)
  },
  loading({commit},payload) {
    commit('setLoading',payload)
  }
}

export default {
  namespaced : true,
  state,
  mutations,
  actions,
  getters
}