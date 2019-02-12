<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <i-select/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot-city/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <cate-groy/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import iSelect from '@/components/changeCity/iselect'
import hotCity from '@/components/changeCity/hot'
import cateGroy from '@/components/changeCity/category'
export default {
  components: {
    iSelect,
    hotCity,
    cateGroy
  }
}
</script>
