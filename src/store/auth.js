/* eslint-disable */

import firebase from 'firebase/app';

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        var uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name: name
        });
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    getUid() {
      var user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout({dispatch, commit}) {
      await firebase.auth().signOut();
      commit('clearInfo');
    }
  }
};