<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types @update:value="onUpdateType"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里添加备注" @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source="tags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Types from '@/components/Money/Types.vue';
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index2';



  @Component({
    components: {Types, FormItem, Tags, NumberPad},
  })
  export default class Money extends Vue {
    tags = store.tagList;
    recordList = store.recordList;
    record: RecordItem = {
      tags: [], note: '', type: '-', amount: 0
    };

    onUpdateNotes(value: string) {
      this.record.note = value;
    }

    onUpdateType(value: string) {
      this.record.type = value;
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      store.createRecord(this.record)
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