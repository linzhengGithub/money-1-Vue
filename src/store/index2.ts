import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';
//封装全部数据到store
const store = {
  ...recordStore,
  ...tagStore,
};
export default store;