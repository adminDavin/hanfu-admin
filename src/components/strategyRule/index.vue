<template>
<div class="wrapper">
  <v-head></v-head>
  <v-sidebar></v-sidebar>
  <div class="content-box" :class="{'content-collapse':collapse}">
  <strategyRule></strategyRule>
  </div>
</div>
</template>

<script>
import vSidebar from '@/components/common/sidebar.vue';
import vHead from '@/components/common/header.vue';
import strategyRule from './strategyRule';
export default {
  name: 'store',
  components: {
    vHead, vSidebar,strategyRule
  },
  data() {
    return {
      collapse: false,
      selectedStone: 1
    }
  },
  methods: {
     selectedStoneHandler(res){
       this.selectedStone = res;
}
  }
}
</script>
<style>
  *{
    margin: 0;
    padding: 0;
    }
</style>
