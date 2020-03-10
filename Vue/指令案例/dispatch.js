const install = Vue => {
  Vue.prototype.$dispath = function(eventName, componentName, value) {
    let parent = this.$parent
    while(parent) {
      if (parent.$options.name === componentName) {
        parent.$emit(eventName, value)
        break
      }  
      parent = parent.$parent
    }
  }
}

export default install