<template>
  <div
    :id="id"
    :style="{width:width+'px',height:height+'px',margin:'34px auto'}"
    :class="[this.toTop?`m-stick-map`:`m-map`]"
  />
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    point: {
      type: Array,
      default() {
        return [116.46, 39.92]
      }
    }
  },
  data() {
    return {
      id: `map`,
      key: '2d20103a6d74a357802d4323533a7421',
      toTop: false
    }
  },
  watch: {
    point: function(val, old) {
      this.map.setCenter(val)
      this.marker.setPosition(val)
    }
  },
  mounted() {
    let self = this
    window.addEventListener('scroll', this.handleScroll)
    self.id = `map${Math.random()
      .toString()
      .slice(4, 6)}`

    window.onmaploaded = () => {
      let map = new window.AMap.Map(self.id, {
        resizeEnable: true,
        zoom: 20,
        center: self.point
      })
      self.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        let toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
        let marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: self.point
        })
        self.marker = marker
        marker.setMap(map)
      })
    }
    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${
      self.key
    }&callback=onmaploaded`
    let jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      let offsetTop = document.querySelector(`#${this.id}`).offsetTop
      let offsetHeight = document.querySelector(`#${this.id}`).offsetHeight
      this.toTop = scrollTop > offsetTop + offsetHeight
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
