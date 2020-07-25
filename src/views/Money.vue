<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里添加备注" :value.sync="record.note"/>
    </div>
    <Tags @update:value = "record.tags = $event"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constant/recordTypeList';

  @Component({
    components: {Tabs, FormItem, Tags, NumberPad},
  })
  export default class Money extends Vue {
    recordTypeList = recordTypeList;

    get recordList() {
      return this.$store.state.recordList;
    }

    record: RecordItem = {
      tags: [], note: '', type: '-', amount: 0
    };

    created() {
      this.$store.commit('fetchRecords');
    }

    onUpdateNotes(value: string) {
      this.record.note = value;
    }


    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      if (!this.record.tags || this.record.tags.length === 0){
        return window.alert('请至少选择一个标签！')
      }
      if (this.record.amount === 0){
        return window.alert('请输入金额！')
      }
      this.$store.commit('createRecord', this.record);
      if (this.$store.state.createRecordError === null){
        window.alert('已保存！')
        this.record.note = '';
        return;
      }
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

  .notes {
    padding: 12px 0;
  }
</style>