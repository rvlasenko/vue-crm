import firebase from 'firebase/app';

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    }
  },
  actions: {
    async fetchInfo({dispatch, commit}) {
      try {
        var uid = await dispatch('getUid');
        var info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        commit('setInfo', info);
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    info: state => state.info
  },
};