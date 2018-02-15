import Vue from 'vue'
import view from './view'

const ViewConstructor = Vue.extend(view)

let instance
const defaults = {
  images: '',
  fullscreen: '',
  tag: ''
}

// ViewConstructor.prototype.close
const View = (options={}) => {
  options = Object.assign({}, defaults, options)
  console.log(instance);
  if (instance) {
    instance = undefined
  }
  instance = new ViewConstructor({
    // el: document.createElement('div'),
    data: options
  }).$mount()
  const parent = document.body
  parent.appendChild(instance.$el)
}

export default {
  install(Vue) {
    Vue.prototype.showImage = View
  },
  View
}