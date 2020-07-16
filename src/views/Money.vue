<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types @update:value="onUpdateType"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    {{record}}
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Types from '@/components/Money/Types.vue';
  import {Component, Watch} from 'vue-property-decorator';

  type Record = {
    type: string;
    note: string;
    tags: string[];
    amount: number;
  }

  @Component({
    components: {Types, Notes, Tags, NumberPad},
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];
    record: Record = {
      tags: [], note: '', type: '-', amount: 0
    };
    recordList: Record[] = [];

    onUpdateTags(value: string[]) {
      this.record.tags = value
    }

    onUpdateNotes(value: string) {
      this.record.note = value
    }

    onUpdateType(value: string) {
      this.record.type = value
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value)
    }
    saveRecord(){
      const record2 = JSON.parse(JSON.stringify(this.record))
      this.recordList.push(record2)
      console.log(this.record);
    }
    @Watch('recordList')
    onRecordListChanged(){
      window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
</style>