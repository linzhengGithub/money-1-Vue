<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" class="leftIcon" @click="goBack"/>
      <span>编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem
        :value="tag.name"
        @update:value="update"
        field-name="标签名"
        placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
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
    tag?: { id: string ; name: string } = undefined;

    created() {
      const id = this.$route.params.id;
      tagsListModel.fetch();
      const tags = tagsListModel.data;
      const tag = tags.filter(t => t.id === id)[0];
      if (tag) {
        this.tag = tag;
      } else {
        this.$router.replace('/404');
      }
    }
    update(name: string){
      if(this.tag){
        tagsListModel.update(this.tag.id,name)
      }
    }
    remove(){
      if(this.tag){
        if(tagsListModel.remove(this.tag.id)){
          this.$router.back();
        }
      }
    }
    goBack(){
      this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
  .navBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    font-size: 16px;
    padding: 12px 16px;

    > .leftIcon {
      width: 20px;
      height: 20px;
    }

    > .rightIcon {
      width: 20px;
      height: 20px;
    }
  }

  .form-wrapper {
    background: white;
    margin-top: 8px;
  }

  .button-wrapper {
    text-align: center;
    padding-top: 44-16px;
  }
</style>