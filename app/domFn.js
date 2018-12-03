class domFn {
    constructor() {}
    remove(dom) {
      var navigatorName = "Microsoft Internet Explorer";
      if (navigator.appName == navigatorName) {
        dom.removeNode(true);
      } else {
        dom.remove();
      }
    }
    // 二次解析后台返回的dom内容
    decodeHtml(str) {
      if (typeof window !== 'undefined') {
        let htmlObj = document.createElement('div')
        htmlObj.innerHTML = str
        let content = htmlObj.innerText
        this.remove(htmlObj)
        return content
      } else {
        return ''
      }
    }
    // 摇晃效果
    shake(dom) {
      this.toggleClass(dom, 'shake animated')
      this.once(dom, 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
        this.removeClass(dom, 'shake animated')
      })
    }
    //   一次执行
    once(dom, type, callback) {
      type = type.split(' ')
      for (let item of type) {
        let handle = () => {
          callback()
          dom.removeEventListener(item, handle)
        }
        dom.addEventListener(item, handle)
      }
    }
    hasClass(dom, cls) {
      return dom.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
    addClass(dom, cls) {
      if (!this.hasClass(dom, cls)) dom.className += " " + cls;
    }
    removeClass(dom, cls) {
      if (this.hasClass(dom, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        dom.className = dom.className.replace(reg, ' ');
      }
    }
    toggleClass(dom, cls) {
      if (this.hasClass(dom, cls)) {
        this.removeClass(dom, cls);
      } else {
        this.addClass(dom, cls);
      }
    }
  }
  export default new domFn()
  