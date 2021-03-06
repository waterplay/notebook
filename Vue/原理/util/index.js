import {ASSETS_TYPE} from '../global-api/constant'
/**
 * 当前数据是不是对象
 * @return {boolean}
 */
export function isObject(data) {
  return typeof data === 'object' && data !== null
}

export function noop() {
  
}

export function def(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: false,
    configurable: false,
    value
  })
}

/**
 * 代理
 * @param {object} vm
 * @param {string} source
 * @param {string} key
 */
export function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(newValue) {
      vm[source][key] = newValue
    }
  })
}

const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
]

let strats = {}
/** 
 * 合并周期 
 */
function mergeHook(parentValue, childValue) {
  if (childValue) {
    if (parentValue) {
      return parentValue.concat(childValue)
    } else {
      return [childValue]
    }
  } else {
    return parentValue
  }
}

LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})

function mergeAssets(parentVal, childVal) {
  // 重载  先找自己的  再找原型链上的
  const res = Object.create(parentVal) // res.__proto__ = parentVal 
  if (childVal) {
    for (let key in childVal) {
      res[key] = childVal[key]
    }
  }
  return res
}

ASSETS_TYPE.forEach(type => {
  strats[type + 's'] = mergeAssets
})

/**
 * 合并对象
 * @param {object} parent
 * @param {object} child 
 */
export function mergeOptions(parent, child) {
  const options = Object.create(null)

  for (let key in parent) {
    mergeField(key)
  }

  for (let key in child) { // 如果已经合并过了就不需要再合并了
    if (!parent.hasOwnProperty(key)) {
      mergeField[key]
    }
  }

  function mergeField(key) {
    if (strats[key]) {
      return options[key] = strats[key](parent[key], child[key])
    }
    if (isObject(parent[key]) && isObject(child[key])) {
      options[key] = {
        ...parent[key],
        ...child[key]
      }
    } else if (child[key] === null) {
      options[key] = parent[key]
    } else {
      options[key] = child[key]
    }
  }

  return options
}

/**
 * @param {string} tagName
 * @return {boolean} 
 */
export function isReservedTag(tagName) {
  let str = 'p,div,span,input,a,button,form,textarea,i,iframe'
  let obj = {}
  str.split(',').forEach(tag => obj[tag] = true)
  return obj[tagName]
}