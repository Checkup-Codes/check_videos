import { createStore } from 'vuex';

import ActiveMenu from './Modules/ActiveMenu';
import Bookmarks from './Modules/Bookmarks';
import Writes from './Modules/Writes';
import Theme from './Modules/Theme';
import CategorySidebar from './Modules/CategorySidebar';
import Projects from './Modules/Projects';
import Rendition from './Modules/Rendition';
import Versions from './Modules/Versions';
import Journey from './Modules/Journey';
import Certificates from './modules/certificates';

export default createStore({
  modules: {
    ActiveMenu,
    Writes,
    Bookmarks,
    Theme,
    CategorySidebar,
    Projects,
    Rendition,
    Versions,
    Journey,
    Certificates,
  },
});
