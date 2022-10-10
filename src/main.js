import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import App from './App.vue';
import router from './router';
import store from './store';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';

NProgress.configure({ showSpinner: false });

const app = createApp(App);
const head = createHead();

app.component('base-button', BaseButton);
app.component('base-card', BaseCard);

for (const [name, comp] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, comp);
}
app.use(ElementPlus, {
  locale: zhCn
});

app.use(head);
app.use(store);
app.use(router);
app.mount('#app');
