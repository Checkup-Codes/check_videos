import axios from 'axios';

const state = () => ({
  bookmarks: [],
  bookmarkCategories: [],
});

const mutations = {
  SET_BOOKMARKS(state, bookmarks) {
    state.bookmarks = bookmarks;
  },
  SET_BOOKMARKS_CATEGORIES(state, categories) {
    state.bookmarkCategories = categories;
  },
  ADD_BOOKMARK(state, bookmark) {
    state.bookmarks.push(bookmark);
  },
  UPDATE_BOOKMARK(state, updatedBookmark) {
    const index = state.bookmarks.findIndex(b => b.id === updatedBookmark.id);
    if (index !== -1) {
      state.bookmarks.splice(index, 1, updatedBookmark);
    }
  },
  DELETE_BOOKMARK(state, bookmarkId) {
    state.bookmarks = state.bookmarks.filter(b => b.id !== bookmarkId);
  },
};

const actions = {
  async fetchBookmarks({ commit }) {
    try {
      const response = await axios.get('/api/v1/bookmarks');
      commit('SET_BOOKMARKS', response.data.bookmarks);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  },
  async fetchBookmarkCategories({ commit }) {
    try {
      const response = await axios.get('/api/v1/bookmark-categories');
      commit('SET_BOOKMARKS_CATEGORIES', response.data.bookmarks);
      return response.data.categories;
    } catch (error) {
      console.error('Error fetching bookmark categories:', error);
    }
  },
  async addBookmark({ commit }, bookmark) {
    try {
      const response = await axios.post('/api/v1/bookmarks', bookmark);
      commit('ADD_BOOKMARK', response.data);
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  },
  async updateBookmark({ commit }, bookmark) {
    try {
      const response = await axios.put(`/api/v1/bookmarks/${bookmark.id}`, bookmark);
      commit('UPDATE_BOOKMARK', response.data);
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  },
  async deleteBookmark({ commit }, bookmarkId) {
    try {
      await axios.delete(`/api/v1/bookmarks/${bookmarkId}`);
      commit('DELETE_BOOKMARK', bookmarkId);
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  },
};

const getters = {
  bookmarks: (state) => state.bookmarks,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
