import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordStore = {
  //record store
  recordList: [] as RecordItem[],


};

recordStore.fetchRecords();

export default recordStore;