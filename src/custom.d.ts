type RecordItem = {
  type: string;
  note: string;
  tags: string[];
  amount: number;//数据类型 object | string
  createAt?: string;//等价于createAt: Date | undefined;类 / 构造函数
}

type Tag = {
  id: string;
  name: string;
}
type TagsListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated';
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  remove: (id: string) => boolean;
  save: () => void;
}

interface Window {
  store: {
    tagList: Tag[];
    createTag: (name: string) => void;
    removeTag: (id: string) => boolean;
    updateTag: TagsListModel['update'];//等价于update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
    findTag: (id: string) => Tag | undefined;
    recordList: RecordItem[];
    createRecord: (record: RecordItem) => void;
  };
}
type  RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}
