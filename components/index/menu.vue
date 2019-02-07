<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item,index) in $store.state.home.menu" :key="index" @mouseenter="mouseenter">
        <i :class="item.type"/>
        {{item.name}}
        <span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail" v-if="kind" @mouseenter="sover" @mouseleave="sout">
      <template v-for="(item,index) in curdetail.child">
        <h4 :key="index">{{item.title}}</h4>
        <span v-for="item in item.child" :key="item">{{item}}</span>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      kind: '',
      menu: [
        {
          type: 'food',
          name: '美食',
          child: [
            {
              title: '美食',
              child: ['代金券', '甜点', '火锅']
            }
          ]
        }
      ]
    }
  },
  computed: {
    curdetail() {
      return this.$store.state.home.menu.filter(
        item => item.type === this.kind
      )[0]
    }
  },
  methods: {
    mouseleave() {
      let self = this
      self._time = setTimeout(() => {
        self.kind = ''
      }, 150)
    },
    mouseenter(e) {
      this.kind = e.target.querySelector('i').className
    },
    sover() {
      clearTimeout(this._time)
    },
    sout() {
      this.kind = ''
    }
  }
}
</script>

