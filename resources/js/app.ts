import '../css/app.css';
import '@/Shared/Css/quill-styles.css';

import { createSSRApp, h, DefineComponent } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { InertiaProgress } from '@inertiajs/progress';
// @ts-ignore
import MainLayout from './Layouts/MainLayout.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faCog,
  faIndustry,
  faBook,
  faPencilAlt,
  faBookmark,
  faCube,
  faSync,
  faFolder,
  faLink,
  faShareAlt,
  faGlobe,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faGithub,
  faYoutube,
  faLinkedin,
  faMedium,
  faTwitter,
  faTiktok,
  faPinterest,
} from '@fortawesome/free-brands-svg-icons';
library.add(
  faHome,
  faCog,
  faIndustry,
  faBook,
  faInstagram,
  faGithub,
  faYoutube,
  faLinkedin,
  faMedium,
  faTwitter,
  faTiktok,
  faPinterest,
  faPencilAlt,
  faBookmark,
  faCube,
  faSync,
  faFolder,
  faLink,
  faShareAlt,
  faGlobe,
  faSun,
  faMoon
);

import store from './Store';
import { INERTIA_PROGRESS_CONFIG } from './Shared/utils/config';
import { initializeIcons } from './Shared/utils/icons';

// Initialize Font Awesome icons
initializeIcons();

// Initialize Inertia Progress
InertiaProgress.init(INERTIA_PROGRESS_CONFIG);

// Theme initialization - Shadcn compatible
// Theme store will handle the dark class, but we ensure clean state here
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
document.documentElement.classList.remove('dark');
}

createInertiaApp({
  resolve: async (name) => {
    const page = (
      await resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>('./Pages/**/*.vue'))
    ).default;

    page.layout = page.layout || MainLayout;
    return page;
  },
  setup({ el, App, props, plugin }) {
    const app = createSSRApp({ render: () => h(App, props) });

    app.use(plugin).use(ZiggyVue).use(store).component('font-awesome-icon', FontAwesomeIcon);

    if (el) {
      store.dispatch('Theme/initTheme');
      app.mount(el);
    } else {
      console.warn('Target element for mounting app not found');
    }
  },
});
