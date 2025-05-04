import './bootstrap';
import '../css/app.css';
import '@/Shared/Css/quill-custom-styles.css';

import { createSSRApp, h, DefineComponent } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import MainLayout from './Layouts/MainLayout.vue';
import store from './Store';

const appName = import.meta.env.VITE_APP_NAME;

createInertiaApp({
  title: (title) => title ? `${title} - ${appName}` : appName,
  resolve: async (name) => {
    const page = (
      await resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>('./Pages/**/*.vue'))
    ).default;

    page.layout = page.layout || MainLayout;

    return page;
  },
  setup({ el, App, props, plugin }) {
    const app = createSSRApp({ render: () => h(App, props) });

    app.use(plugin).use(ZiggyVue).use(store);

    return app;
  },
  progress: {
    color: '#4B5563',
  },
});
