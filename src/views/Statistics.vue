<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <div>
      <ol>
        <li v-for="(group,index) in result" :key="index.id">
          <h3 class="title">{{group.title}}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              {{item.amount}}   {{item.createAt}}
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constant/intervalList';
  import recordTypeList from '@/constant/recordTypeList';

  @Component({
    components: {Tabs},
  })
  export default class Statistics extends Vue {
    beforeCreate(){
      this.$store.commit('fetchRecords')
    }
    get recordList(){
      return (this.$store.state as RootState).recordList
    }
    get result(){
      const {recordList} = this;
      type HashTableValue = {title: string; items: RecordItem[]}
      const hashTable: { [key: string]: HashTableValue}={};
      for (let i = 0; i < recordList.length;i++){
        const  [date,time] = recordList[i].createAt!.split('T')
        hashTable[date] = hashTable[date] || {title: date,items: []};
        hashTable[date].items.push(recordList[i])
      }
      return hashTable
    }

    type = '-';
    interval = 'day';
    intervalList = intervalList;
    recordTypeList = recordTypeList;
  }
</script>

<style lang="scss" scoped>
  ::v-deep {
    .type-tabs-item {
      background: white;
      &.selected {
        background: #c4c4c4;
        &::after {
          display: none;
        }
      }
    }
    .interval-tabs-item {
      height: 48px;
    }
    %item{
      padding: 8px;
      line-height: 24px;
      display: flex;
      align-items: center;
    }
    .title{
      @extend %item;
    }
    .record{
      background: white;
      @extend %item;
    }
  }
</style>