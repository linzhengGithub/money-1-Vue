import recordListModel from '@/models/recordListModel';
import tagsListModel from '@/models/tagsListModel';
//封装全部数据到store
const store = {
  //record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => {
    return recordListModel.create(record);
  },

  //tag store
  tagList: tagsListModel.fetch(),
  createTag: (name: string) => {
    if (name) {
      const message = tagsListModel.create(name);
      if (message === 'duplicated') {
        window.alert('标签名重复！');
      } else if (message === 'success') {
        window.alert('保存成功！');
      }
    }
  },
  removeTag: (id: string) => {
    return tagsListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagsListModel.update(id, name);
  },
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
};
export default store;