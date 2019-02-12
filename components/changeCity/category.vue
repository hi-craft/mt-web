<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="(item,key) in list" :key="key">
        <a :href="`#city-${item}`">{{item}}</a>
      </dd>
    </dl>
    <dl v-for="(item,key) in block" :key="key" class="m-categroy-section">
      <dt :id="`city-${item.title}`">{{item.title}}</dt>
      <dd>
        <span v-for="(city,key) in item.city" :key="key">{{city}}</span>
      </dd>
    </dl>
  </div>
</template>
<script>
import pyjs from 'js-pinyin'
export default {
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block: []
    }
  },
  async mounted() {
    let self = this
    let blocks = []
    let {
      status,
      data: { city }
    } = await self.$axios.get('/geo/city')
    if (status === 200) {
      let temCol = {}
      city.forEach(element => {
        let initials = pyjs
          .getFullChars(element.name)
          .toLocaleLowerCase()
          .slice(0, 1)
        if (!temCol[initials]) {
          temCol[initials] = []
        }
        temCol[initials].push(element.name)
      })
      console.log('temCol', temCol)
      for (let [k, v] of Object.entries(temCol)) {
        blocks.push({
          title: k.toUpperCase(),
          city: v
        })
      }
      blocks.sort((a, b) => a.title.charCodeAt() - b.title.charCodeAt())
      console.log('blocks', blocks)
      self.block = blocks
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/changecity/categroy.scss';
</style>

