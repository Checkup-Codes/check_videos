import './bootstrap';
import '../css/app.css';
import '@/Shared/Css/quill-custom-styles.css';

import { createSSRApp, h, DefineComponent } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import MainLayout from './Layouts/MainLayout.vue';
import { InertiaProgress } from '@inertiajs/progress';

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
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faGithub, faYoutube, faLinkedin, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons';
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
  faPencilAlt,
  faBookmark,
  faCube,
  faSync,
  faFolder,
  faLink,
  faShareAlt,
  faGlobe
);

import store from './Store';

const appName = import.meta.env.VITE_APP_NAME;

InertiaProgress.init({
  delay: 0,
  color: '#29d',
  includeCSS: true,
  showSpinner: true,
});

createInertiaApp({
  title: (title) => `${title} ${appName}`,
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

    app.mount(el);
  },
  progress: {
    color: '#4B5563',
  },
});
