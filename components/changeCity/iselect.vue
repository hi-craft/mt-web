<template>
  <div class="m-iselect">
    <h3 class="name">按省份选择：</h3>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-select v-model="cvalue" placeholder="城市" :disabled="!city.length">
      <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <h3 class="name name-mrl">直接搜索：</h3>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      cities: []
    }
  },
  watch: {
    async pvalue(newPvalue) {
      let self = this
      let {
        status,
        data: { city }
      } = await self.$axios.get(`/geo/province/${newPvalue}`)

      if (status === 200) {
        self.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        self.cvalue = ''
      }
    }
  },
  async mounted() {
    let self = this
    let {
      status,
      data: { province }
    } = await self.$axios.get('/geo/province')
    if (status === 200) {
      self.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function(query, cb) {
      let self = this
      if (self.cities.length) {
        cb(self.cities.filter(item => item.value.indexOf(query) > -1))
      } else {
        let {
          status,
          data: { city }
        } = await self.$axios.get('/geo/city')
        // console.log('city', city)
        if (status === 200) {
          self.cities = city.map(item => {
            return {
              value: item.name
            }
          })
          cb(self.cities.filter(item => item.value.indexOf(query) > -1))
        } else {
          cb([])
        }
      }
    }, 200),
    handleSelect(item) {
      console.log('item.value', item.value)
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/changecity/iselect.scss';
</style>


