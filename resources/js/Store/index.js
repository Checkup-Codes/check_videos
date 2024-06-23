import { createStore } from 'vuex';
import ActiveMenu from './Modules/ActiveMenu';
import Writes from './Modules/Writes';

export default createStore({
  modules: {
    ActiveMenu,
    Writes,
  },
});
