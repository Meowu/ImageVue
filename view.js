import './view.css'
export default {
  name: "ImageView",
  data() {
    return {
      images: '',
      fullscreen: true,
      tag: '',
      width: '',
      height: '',
      list: null,
      current: 0,
      limit: 1,
    }
  },
  mounted() {
    this.$el.onclick = (e) => {
      e.stopPropagation()
      this.close()
    }
    this.$nextTick(() => {
      this.list = Array.from(document.getElementsByClassName('ImageView--item'))
      console.log(document.querySelectorAll('.ImageView--item'))
      console.log(this.list);
      this.limit = this.list.length - 1
      this.list[this.current].classList.add('is-active')
      this.$watch('current', function(val, old) {
        console.log('val:', val);
        console.log('old:', old);
        if (val > this.limit) {
          this.current = 0
          this.list[this.current].classList.add('is-active')
          this.list[this.limit].classList.remove('is-active')
        } else if (val < 0) {
          this.current = this.limit
          this.list[this.current].classList.add('is-active')
          this.list[0].classList.remove('is-active')
        } else {
          this.list[this.current].classList.add('is-active')
          this.list[old].classList.remove('is-active')
        }
      })
    })
  },
  watch: {
    // current(val, old) {
    //   val > this.limit && (val = 0)
    //   this.list[val].classList.add('is-active')
    //   this.list[old].classList.remove('is-active')
    // },
    // limit(val) {
    //   val >
    // }
  },
  computed: {
    classes() {
      return {
        'ImageView': true,
        'ImageView--fullscreen': this.fullscreen
      }
    }
  },
  methods: {
    close() {
      this.$destroy()
      this.$el.remove()
    },
    // genImage(h, src) {
    //   return h('img', {
    //     staticClass: 'ImageView--item',
    //     attrs: {
    //       src: src,
    //       alt: 'ImageView__Preview'
    //     }
    //   })
    // },
    genSlidePrev() {
      const children = this.$createElement('div', {
        staticClass: 'prev'
      })
      return this.$createElement('div', {
        staticClass: 'slide',
        'class': {
          'slide-prev': true
        },
        on: {
          click: e => {
            e.stopPropagation()
            this.current--
          }
        }
      }, [children])
    },
    genSlideNext() {
      const children = this.$createElement('div', {
        staticClass: 'next'
      })
      return this.$createElement('div', {
        staticClass: 'slide',
        'class': {
          'slide-next': true
        },
        on: {
          click: e => {
            e.stopPropagation()
            this.current++
          }
        }
      }, [children])
    },
    genImageBox(h) {
      let children = []
      console.log(this.images);
      if (typeof this.images === 'string') {
        children.push(h('img', {
          staticClass: 'ImageView--item',
          'class': {
            'is-active': true
          },
          attrs: {
            src: this.images,
            alt: 'ImagePreview'
          }
        }))
      } else {
        children = this.images.map(image => h('img', {
          staticClass: 'ImageView--item',
          attrs: {
            src: image,
            alt: 'ImagePreview'
          }
          // 'class': {
          //   'is-active': true
          // }
        }))
      }
      const data = {
        staticClass: 'ImageView--inner',
        'class': {
          'ImageView-box': true
        }
      }
      return h('div', data, children)
    }
  },
  render(h) {
    let children = []
    children.push(this.genImageBox(h))
    if (Object.prototype.toString.call(this.images) === '[object Array]') {
      children.push(this.genSlidePrev())
      children.push(this.genSlideNext())
    }
    return h('div', {
      'class': this.classes
    }, children)
  }
}