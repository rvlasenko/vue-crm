import firebase from 'firebase/app';

export default {
  actions: {
    async fetchCategories({dispatch, commit}) {
      try {
        var uid = await dispatch('getUid');
        var categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};

        return Object.keys(categories).map(key => ({...categories[key], id: key}));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchCategoryById({dispatch, commit}, id) {
      try {
        var uid = await dispatch('getUid');
        var category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {};

        return {
          ...category,
          id,
        };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async createCategory({dispatch, commit}, {title, limit}) {
      try {
        var uid = await dispatch('getUid');
        var category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit});

        return {
          title,
          limit,
          id: category.key
        };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async updateCategory({dispatch, commit}, {id, title, limit}) {
      try {
        var uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit});
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
