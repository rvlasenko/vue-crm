import firebase from 'firebase/app';

export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        var uid = await dispatch('getUid');
        
        return await firebase.database().ref(`/users/${uid}/records`).push(record);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        var uid = await dispatch('getUid');
        var records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {};
        
        return Object.keys(records).map(key => ({...records[key], id: key}));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchRecordById({dispatch, commit}, id) {
      try {
        var uid = await dispatch('getUid');
        var record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {};
        
        return {
          ...record,
          id
        };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
