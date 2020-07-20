import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagsListModel from '@/models/tagsListModel';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

window.tagList = tagsListModel.fetch();
window.createTag = (name: string) => {
  if (name) {
    const message = tagsListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签名重复！');
    } else if (message === 'success') {
      window.alert('保存成功！');
    }
  }
};
window.removeTag = (id: string) => {
  return tagsListModel.remove(id);
};
window.updateTag = (id: string, name: string) => {
  return tagsListModel.update(id, name);
};
window.findTag = (id: string) => {
  return window.tagList.filter(t => t.id === id)[0]
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
