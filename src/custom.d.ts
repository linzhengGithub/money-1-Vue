type RecordItem = {
  type: string;
  note: string;
  tags: string[];
  amount: number;//数据类型 object | string
  createAt?: Date;//等价于createAt: Date | undefined;类 / 构造函数
}