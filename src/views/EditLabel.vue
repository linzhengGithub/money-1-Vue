<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" class="leftIcon"/>
      <span>编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagsListModel from '@/models/tagsListModel';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';
  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    created() {
      const id = this.$route.params.id;
      console.log(id);
      tagsListModel.fetch();
      const tags = tagsListModel.data;
      console.log(tags);
      const tag = tags.filter(t => t.id === id)[0];
      if (tag) {
        console.log(tag);
      } else {
        this.$router.replace('/404');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navBar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    font-size: 16px;
    padding: 12px 16px;
    > .leftIcon{
      width: 20px;
      height: 20px;
    }
    > .rightIcon{
      width: 20px;
      height: 20px;
    }
  }
  .form-wrapper{
    background: white;
    margin-top: 8px;
  }
  .button-wrapper{
    text-align: center;
    padding-top: 44-16px;
  }
</style>