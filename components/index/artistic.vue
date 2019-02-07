<template>
  <section class="m-istyle">
    <dl>
      <dt>有格调</dt>
      <dd>全部</dd>
      <dd>约会聚餐</dd>
      <dd>丽人SPA</dd>
      <dd>电影演出</dd>
      <dd>品质出游</dd>
    </dl>
    <ul class="ibody">
      <li v-for="item in items" :key="item.title">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" class="image">
          <ul class="cbody">
            <li class="title">{{item.title}}</li>
            <li class="pos">
              <span>{{item.pos}}</span>
            </li>
            <li class="price">
              ￥
              <em>{{item.price}}</em>
              <span>/起</span>
            </li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: '拾渔餐厅（让区店）',
          img:
            'https://p0.meituan.net/mogu/3f241e2ed8f15f076a86c003a4505658613656.png@368w_208h_1e_1c',
          pos: '品质3-4人套餐',
          price: '398'
        },
        {
          title: '簋街麻小（学伟鑫城店）',
          img:
            'https://p0.meituan.net/poi/e176a2fc4cf86f68f9049cf87d8ba364243712.jpg@368w_208h_1e_1c',
          pos: '4-6人',
          price: '251'
        },
        {
          title: '国王冰室（联想科技城总店）',
          img:
            'https://p0.meituan.net/mogu/c1be8429d04e283de7e79a245c114be7129423.jpg@368w_208h_1e_1c',
          pos: '2-4人套餐，包间免费',
          price: '238'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/index/artistic.scss';
</style>