<template>
<div class="wrapper">
  <v-head></v-head>
  <v-sidebar></v-sidebar>
  <div class="content-box" :class="{'content-collapse':collapse}">
    <award></award>
  </div>
</div>
</template>

<script>
import vSidebar from '@/components/common/sidebar.vue';
import vHead from '@/components/common/header.vue';
import award from './award'

export default {
  name: 'store',
  components: {
    vHead,
    vSidebar,
    award
  },
  data() {
    return {
      collapse: false,
      selectedStone: 1
    }
  },
  methods: {
    // selectedStoneHandler(res) {
    //   this.selectedStone = res;
    // }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
