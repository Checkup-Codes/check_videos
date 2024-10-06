import { createStore } from 'vuex';
import ActiveMenu from './Modules/ActiveMenu';
import Writes from './Modules/Writes';
import Bookmarks from './Modules/Bookmarks';

export default createStore({
  modules: {
    ActiveMenu,
    Writes,
    Bookmarks,
  },
});
