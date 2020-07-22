import Vue from 'vue'
import Component from 'vue-class-component'


@Component
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('要添加的标签名：');
    if (name === '') {
      window.alert('标签名不能为空！');
    } else if (name === null) {
      return;
    } else if (name) {
      this.$store.commit('createTag',name)
    }
  }
}
export default TagHelper;