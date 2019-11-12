(function (w) {

  let copyMouse = function (obj) {
    // 函数体
    return new copyMouse.fn.init(obj)
  }

  copyMouse.fn = copyMouse.prototype = {
    // 扩展原型对象
    obj: null,
    init: function (obj) {
      this.obj = obj
      return this
    },
    contains: function (a, b) {
      return a.contains ? a !== b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16)
    },
    getRelated: function (e) {
      let related
      let type = e.type.toLowerCase() //这里获取事件名字
      if (type === 'mouseover') {
        related = e.relatedTarget || e.fromElement
      } else
      if (type === 'mouseout') {
        related = e.relatedTarget || e.toElement
      }
      return related
    },
    over: function (fn) {
      let obj = this.obj
      let _self = this
      obj.onmouseover = function (e) {
        let related = _self.getRelated(e)
        if (this !== related && !_self.contains(this, related)) {
          fn()
        }
      }
      return _self
    },
    out: function (fn) {
      let obj = this.obj
      let _self = this
      obj.onmouseout = function (e) {
        let related = _self.getRelated(e)
        if (obj !== related && !_self.contains(obj, related)) {
          fn()
        }
      }
      return _self
    }
  }
  copyMouse.fn.init.prototype = copyMouse.fn
  window.copyMouse = window.$$ = copyMouse
})(window)