<template>
  <Layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags" :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{tag.name}}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';
  @Component({
    components: {Button},
  })
  export default class Labels extends mixins(TagHelper) {
    get tags() {
      return this.$store.state.tagList;
    }
    beforeCreate() {
      this.$store.commit('fetchTags');
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/reset.scss";

  .tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;

    > .tag {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 44px;
      border-bottom: 1px solid #e6e6e6;

      svg {
        margin-right: 16px;
        color: #666;
        width: 20px;
        height: 20px;
      }
    }
  }

  .createTag {
    background: #f60;
    color: white;
    border: none;
    border-radius: 4px;
    height: 40px;
    padding: 0 10px;

    &-wrapper {
      text-align: center;
      padding-top: 16px;
      margin-top: 44-16px;
    }
  }
</style>