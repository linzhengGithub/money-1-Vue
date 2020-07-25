import Vue from 'vue'
import Component from 'vue-class-component'

const map: {[key: string]: string} ={
  'tag name duplicated' : '标签名重复了'
}
@Component
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('要添加的标签名：');
    if (name === '') {
      window.alert('标签名不能为空！');
      return;
    } else if (name === null) {
      return;
    }else{
      this.$store.commit('createTag',name)
    }
    if(this.$store.state.createTagError){
      window.alert(map[this.$store.state.createTagError.message] || '未知错误')
      return;
    }
  }
}
export default TagHelper;