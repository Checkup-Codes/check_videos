import { createStore } from 'vuex';

import ActiveMenu from './Modules/ActiveMenu';
import Bookmarks from './Modules/Bookmarks';
import Writes from './Modules/Writes';
import Theme from './Modules/Theme';
import CategorySidebar from './Modules/CategorySidebar';

export default createStore({
  modules: {
    ActiveMenu,
    Writes,
    Bookmarks,
    Theme,
    CategorySidebar,
  },
});
