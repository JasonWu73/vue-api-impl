import { createApp } from 'vue';
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

NProgress.configure({ showSpinner: false });

const app = createApp(App);

app.component('base-button', BaseButton);

for (const [name, comp] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, comp);
}
app.use(ElementPlus, {
  locale: zhCn
});

app.use(store);
app.use(router);
app.mount('#app');
