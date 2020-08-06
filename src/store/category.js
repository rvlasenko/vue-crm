import firebase from 'firebase/app';

export default {
  actions: {
    async createCategory({dispatch, commit}, {title, limit}) {
      try {
        var uid = await dispatch('getUid');
        var category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit});

        return {
          title, limit, id: category.key
        };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    }
  },
};