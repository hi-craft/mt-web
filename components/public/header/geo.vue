<template>
  <div class="m-ge">
    <i class="el-icon-location"/>{{$store.state.geo.position.city}}
    <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>
    [黑龙江]
  </div>
</template>
<script>
export default {}
</script>

