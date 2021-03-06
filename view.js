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
      // closeBtn: false,
    }
  },
  mounted() {
    if (!this.closable) {
      this.$el.onclick = (e) => {
        e.stopPropagation()
        this.close()
      }
    }
    this.$nextTick(() => {
      Object.prototype.toString.call(this.images) === '[object Array]' && (this.limit = this.images.length - 1)
      this.$watch('current', function(val, old) {
        val > this.limit && (this.current = 0)
        val < 0 && (this.current = this.limit)
        this.$refs.preview.setAttribute('src', this.images[this.current])
      })
      // this.list = Array.from(document.getElementsByClassName('ImageView--item'))
      // this.limit = this.list.length - 1
      // this.list[this.current].classList.add('is-active')
      // this.$watch('current', function(val, old) {
      //   console.log('val:', val);
      //   console.log('old:', old);
      //   if (val > this.limit) {
      //     this.current = 0
      //     this.list[this.current].classList.add('is-active')
      //     this.list[this.limit].classList.remove('is-active')
      //   } else if (val < 0) {
      //     this.current = this.limit
      //     this.list[this.current].classList.add('is-active')
      //     this.list[0].classList.remove('is-active')
      //   } else {
      //     this.list[this.current].classList.add('is-active')
      //     this.list[old].classList.remove('is-active')
      //   }
      // })
    })
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
    closeBtn() {
      return this.$createElement('button', {
        staticClass: 'ImageView--close__btn',
        attrs: {
          type: 'button'
        },
        on: {
          click: e => {
            e.stopPropagation()
            this.close()
          }
        }
      })
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
      const style = {}
      this.width && (style.maxWidth = this.width + 'px')
      this.height && (style.maxHeight = this.height + 'px')
      let children = []
      console.log(this.images);
      if (typeof this.images === 'string') {
        children.push(h('img', {
          staticClass: 'ImageView--item',
          'class': {
            'is-active': true
          },
          style: style,
          attrs: {
            src: this.images,
            alt: 'ImagePreview'
          }
        }))
      } else {
        children.push(h('img', {
          staticClass: 'ImageView--item',
          'class': {
            'is-active': true
          },
          style: style,
          attrs: {
            src: this.images[0],
            alt: 'ImagePreview'
          },
          ref: 'preview'
        }))
        // children = this.images.map(image => h('img', {
        //   staticClass: 'ImageView--item',
        //   style: style,
        //   attrs: {
        //     src: image,
        //     alt: 'ImagePreview'
        //   }
        //   // 'class': {
        //   //   'is-active': true
        //   // }
        // }))
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
    if(this.closable) {
      children.push(this.closeBtn())
    }
    if (Object.prototype.toString.call(this.images) === '[object Array]') {
      children.push(this.genSlidePrev())
      children.push(this.genSlideNext())
    }
    return h('div', {
      'class': this.classes
    }, children)
  }
}