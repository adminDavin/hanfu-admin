<template>
<div >
  <!-- <v-head></v-head> -->
  <!-- <v-sidebar></v-sidebar> -->
  <!-- <div class="content-box" :class="{'content-collapse':collapse}">

  </div> -->
  <div style="padding: 20px 20px 0 40px; ">
     <activeTable></activeTable>
  </div>

</div>
</template>

<script>
import vSidebar from '@/components/common/sidebar.vue';
import vHead from '@/components/common/header.vue';
import activeTable from './activeTable';
export default {
  name: 'store',
  components: {
    vHead, vSidebar, activeTable
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
