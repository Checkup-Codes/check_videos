import { createStore } from 'vuex';
import ActiveMenu from './Modules/ActiveMenu';
import Writes from './Modules/Writes';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    ActiveMenu,
    Writes,
  },
  plugins: [createPersistedState()],
});
