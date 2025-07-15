import { createSSRApp, h, DefineComponent } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import MainLayout from './Layouts/MainLayout.vue';
import store from './Store';
import { initializeIcons } from './Shared/utils/icons';

export default function render(page: any) {
  initializeIcons();
  return createInertiaApp({
    page,
    resolve: async (name: string) => {
      const page = (
        await resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>('./Pages/**/*.vue'))
      ).default;
      (page as any).layout = (page as any).layout || MainLayout;
      return page;
    },
    setup({ App, props, plugin }) {
      const app = createSSRApp({ render: () => h(App, props) });
      app.use(plugin).use(ZiggyVue).use(store).component('font-awesome-icon', FontAwesomeIcon);
      return app;
    },
    progress: false,
  });
}
