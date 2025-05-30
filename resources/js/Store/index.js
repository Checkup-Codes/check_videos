import { createStore } from 'vuex';

import ActiveMenu from './Modules/ActiveMenu';
import Bookmarks from './Modules/Bookmarks';
import Writes from './Modules/Writes';
import Theme from './Modules/Theme';

export default createStore({
  modules: {
    ActiveMenu,
    Writes,
    Bookmarks,
    Theme,
  },
});
