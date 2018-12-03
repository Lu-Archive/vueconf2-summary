var addFile = {
    js: function (path) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = path;
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(a);
    },
    css: function (path) {
        var head = document.getElementsByTagName('HEAD').item(0);
        var style = document.createElement('link');
        style.href = path;
        style.rel = 'stylesheet';
        style.type = 'text/css';
        head.appendChild(style);
    }
}

function setStyleSheet(title) {
    // 找到head
    var doc_head = document.head;
    // 找到所有的link标签
    var link_list = document.getElementsByTagName("link");
    if (link_list) {
        for (var i = 0; i < link_list.length; i++) {
            // 找到我们需要替换的link，
            // 一般情况下有些样式是公共样式，我们可以写到功能样式文件中，不用来做替换；
            // 这样可以避免每次替换的时候样式文件都很大；可以节省加载速度；
            if (link_list[i].getAttribute("ty") === "theme") {
                // 找到后将这个link标签重head中移除
                doc_head.removeChild(link_list[i]);
            }
        }
    }
    // 创建一个新link标签
    var link_style = document.createElement("link");
    // 对link标签中的属性赋值
    link_style.setAttribute("rel", "stylesheet");
    link_style.setAttribute("type", "text/css");
    link_style.setAttribute("href", title);
    link_style.setAttribute("ty", "theme");
    // 加载到head中最后的位置
    doc_head.appendChild(link_style);
};

var sheet = (function () {
    var style = document.createElement('style');

    // WebKit 兼容
    style.appendChild(document.createTextNode(''));

    document.head.appendChild(style);
    return style.sheet;
})();

// Usage
sheet.insertRule("header { float: left; opacity: 0.8; }", 1);


//   判断是否原生函数
(function () {
    var toString = Object.prototype.toString;
    var fnToString = Function.prototype.toString;
    // 构造函数，数组
    var reHostCtor = /^\[object .+?Constructor\]$/;

    var reNative = RegExp('^' +
        // 强制转换（Object-toString）为字符串
        String(toString)
        // 转移特殊字符
        .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&')
        // 替换 `toString` 为 `.*?`， 保持模板通用
        // 替换 `for ...` 等字符来支持添加了额外信息的环境
        .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    function isNative(value) {
        var type = typeof value;
        return type == 'function'
            // 使用 `Function#toString` 来绕过value原生的 `toString` 方法，避免误判
            ?
            reNative.test(fnToString.call(value))
            // 回退到宿主对象检查。因为某些环境中，会将类型数组当做DOM方法。
            :
            (value && type == 'object' && reHostCtor.test(toString.call(value))) || false;
    }

    module.exports = isNative;
}());

// Usage
isNative(alert); // true
isNative(myCustomFunction); // false

//运行一次的函数
function once(fn, context) {
    var result;
  
    return function() {
      if(fn) {
        result = fn.apply(context || this, arguments);
        fn = null;
      }
  
      return result;
    };
  }
  
  // Usage
  var canOnlyFireOnce = once(function() {
    console.log('Fired!');
  });
  

  function center(dom) {
    dom.style.position = 'absolute';
    dom.style.top = '50%';
    dom.style.left = '50%';
    dom.style['margin-top'] = -dom.offsetHeight / 2 + 'px';
    dom.style['margin-left'] = -dom.offsetWidth / 2 + 'px';
  }
  
  function getRealStyle(element, styleName) {
  
    var realStyle = null;
  
    if (element.currentStyle) {
  
      realStyle = element.currentStyle[styleName]; //IE
  
    } else if (window.getComputedStyle) {
  
      realStyle = window.getComputedStyle(element, null)[styleName]; //W3C
  
    }
  
    return realStyle;
  
  }
  
  /**  
   * 数组去重 
   */
  Array.prototype.Unique = function () {
    return [...new Set(this)];
  }
  /**  
   * 数组删除某一项 
   * @param {String} let 要删除那一项的值 
   */
  Array.prototype.DeleteByVal = function (val) {
    return this.filter(function (item) {
      return item !== val;
    })
  }
  //===============================Date==================================//  
  
  /**  
   * 日期格式化 
   * @param {String} format default 'yyyy-MM-dd hh:mm:ss'  'yyyy-MM-dd' 
   */
  Date.prototype.DateFormat = function (format = 'yyyy-MM-dd hh:mm:ss') {
    let o = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format))
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
  }
  
  /**  
   * 获取距离今天的N天的日期  N可正可负 
   * @param {Number} interval default 0  -n 表示前几天  n表示后几天 
   */
  function getIntervalDate(interval = 0) {
    interval = Number(interval)
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + interval);
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1) < 10 ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
    let day = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
    return year + "-" + month + "-" + day;
  }
  
  /**  
   * 时间戳格式化为日期格式 
   * @param {Number} timestamp 时间戳 
   * @param {String} format default 'yyyy-MM-dd hh:mm:ss'  'yyyy-MM-dd'  
   */
  function timestampToDate(timestamp, format = 'yyyy-MM-dd hh:mm:ss') {
    return new Date(parseInt(timestamp) * 1000).DateFormat(format);
  }
  
  //===============================Object==================================//  
  /**  
   * 克隆对象 
   * @param {Object} source  
   */
  function Clone(source) {
    return JSON.parse(JSON.stringify(source))
  }
  
  
  
  
  /** 
   * 设置样式 
   * @param {HTMLElement} elem 需要设置的节点 
   * @param {Object} prop      CSS属性，键值对象 
   */
  function setStyle(elem, prop) {
    if (!elem) {
      return false
    };
    for (let i in prop) {
      elem.style[i] = prop[i];
    }
  };
  /** 
   * 获取节点css属性 
   * @param  {HTMLElement} elem 需要获取的节点 
   * @param  {String} name      css属性 
   * @return {String}           属性值 
   */
  function getStyle(elem, name) { // 获取CSS属性函数  
    if (elem.style[name] != '') return elem.style[name];
    if (!!window.ActiveXObject) return elem.currentStyle[name];
    return document.defaultView.getComputedStyle(elem, "").getPropertyValue(name.replace(/([A-Z])/g, "-$1").toLowerCase());
  }
  
  /** 
   * 获取鼠标光标相对于整个页面的位置 
   * @return {String} 值 
   */
  function getX(e) {
    e = e || window.event;
    let _left = document.documentElement.scrollLeft || document.body.scrollLeft;
    return e.pageX || e.clientX + _left;
  }
  
  function getY(e) {
    e = e || window.event;
    let _top = document.documentElement.scrollTop || document.body.scrollTop;
    return e.pageY || e.clientY + _top;
  }
  
  /** 
   * 获取class命名的节点 
   * @param  {String} className CSS命名 
   * @param  {String} tag       标签名称/去全部标签时用 * 
   * @param  {HTMLElement} parent    查找的范围，通常为包含内容的父节点 
   * @return {Array}           返回筛选节点的数组集合 
   */
  function getElementsByClassName(className, tag, parent) {
    parent = parent || document;
    tag = tag || "*";
    let allTags = (tag === "*" && parent.all) ? parent.all : parent.getElementsByTagName(tag);
    let classElems = [];
    className = className.replace(/\-/g, "\\-");
    let regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
    for (let i = 0; i < allTags.length; i++) {
      elem = allTags[i];
      if (regex.test(elem.className)) {
        classElems.push(elem);
      };
    };
    return classElems;
  };
  
  /** 
   * 为目标元素添加事件监听器 
   * @method on||addEvent 
   * @static 
   * @param {HTMLElement} elem 目标元素 
   * @param {String} type 事件名称 如：click|mouseover 
   * @param {Function} listener 需要添加的监听器 
   * @return 返回操作的元素节点 
   */
  function on(elem, type, listener) {
    type = type.replace(/^on/i, '').toLowerCase();
    let realListener = listener;
    // 事件监听器挂载  
    if (elem.addEventListener) {
      elem.addEventListener(type, realListener, false);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + type, realListener);
    }
    return elem;
  };
  
  let EventHandle = {
    addEvent: function (ele, type, handle) {
      if (ele.addEventListener) {
        ele.addEventListener(type, handle, false);
      } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, handle);
      } else {
        ele["on" + type] = handle;
      }
    },
    deleteEvent: function (ele, type, handle) {
      if (ele.removeEventListener) {
        ele.removeEventListener(type, handle, false);
      } else if (ele.detachEvent) {
        ele.detachEvent("on" + type, handle);
      } else {
        ele["on" + type] = null;
      }
    }
  }
  
  
  /** 
   * 千分位显示 常用于价格 
   * @param {Number} num 
   */
  function toThousands(num) {
    return parseFloat(num).toFixed(2).replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, "$1,");
  }
  console.log(toThousands(252121321.25))
  
  
  /** 
   * 动态加载 CSS 样式文件 
   */
  function LoadStyle(url) {
    try {
      document.createStyleSheet(url);
    } catch (e) {
      let cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.type = 'text/css';
      cssLink.href = url;
      let head = document.getElementsByTagName('head')[0];
      head.appendChild(cssLink);
    }
  }
  
  
  /** 
   * 判断是否移动设备 
   */
  function isMobile() {
    if (typeof this._isMobile === 'boolean') {
      return this._isMobile;
    }
    let screenWidth = this.getScreenWidth();
    let fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport ||
      rendererModel.runningExperiments.fixviewport;
    let fixViewPortsExperimentRunning = fixViewPortsExperiment &&
      (fixViewPortsExperiment.toLowerCase() === "new");
    if (!fixViewPortsExperiment) {
      if (!this.isAppleMobileDevice()) {
        screenWidth = screenWidth / window.devicePixelRatio;
      }
    }
    let isMobileScreenSize = screenWidth < 600;
    let isMobileUserAgent = false;
    this._isMobile = isMobileScreenSize && this.isTouchScreen();
    return this._isMobile;
  }

  

  
  
  /** 
   * 获取页面高度 
   */
  function getPageHeight() {
    let g = document,
      a = g.body,
      f = g.documentElement,
      d = g.compatMode == "BackCompat" ?
      a :
      g.documentElement;
    return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
  }
  
  /** 
   * 获取页面scrollLeft 
   */
  function getPageScrollLeft() {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
  }
  
  
  /** 
   * 获取页面宽度 
   */
  function getPageWidth() {
    let g = document,
      a = g.body,
      f = g.documentElement,
      d = g.compatMode == "BackCompat" ?
      a :
      g.documentElement;
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
  }
  
  /** 
   * 获取页面scrollTop 
   */
  function getPageScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }
  
  /** 
   * 获取页面可视高度 
   */
  function getPageViewHeight() {
    let d = document,
      a = d.compatMode == "BackCompat" ?
      d.body :
      d.documentElement;
    return a.clientHeight;
  }
  
  
  function MouseWheelHandle(obj, handle) {
    let info = navigator.userAgent;
    let down = null;
    if (info.indexOf("Firefox") != -1) {
      obj.addEventListener("DOMMouseScroll", function (event) {
        let ev = event || window.event;
        if (ev.detail > 0) {
          down = true;
        } else {
          down = false;
        }
        handle(down, ev);
        handle.apply(obj, [down, ev]);
      }, false);
    } else {
      obj.onmousewheel = function (event) {
        let ev = event || window.event;
        if (ev.wheelDelta > 0) {
          down = false;
        } else {
          down = true;
        }
        handle(down, ev);
        handle.apply(obj, [down, ev]);
        handle.call(obj, down, ev);
      }
    }
  }


  //获取鼠标位置的函数，配合onmouseover事件使用
function mousePos(e){
    var x,y;
    var e = e||window.event;
    return {
        x:e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,
        y:e.clientY+document.body.scrollTop+document.documentElement.scrollTop
    };
}


/**
 * console.log(scroll().top);//获取滚动y值
 * console.log(scroll().left);//获取滚动left值
 * @returns {*}
 */
function scroll(){
    if(window.pageXOffset != null){ // ie9+ 和 最新浏览器
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }else if(document.compatMode == 'CSS1Compat'){ // 遵循W3C浏览器
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }
    return {//其他
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }
}

//基于jquery，内部滚动到顶部、底部后窗口不滚动--待完善
function hoverNoScroll(dom){
    dom.on('mousewheel DOMMouseScroll', function(e) {
        var scrollTo = null;
        if (e.type == 'mousewheel') {
            scrollTo = (e.originalEvent.wheelDelta * -1);
        }
        else if (e.type == 'DOMMouseScroll') {
            scrollTo = 40 * e.originalEvent.detail;
        }
        if (scrollTo) {
            e.preventDefault();
            $(this).scrollTop(scrollTo + $(this).scrollTop());
        }
    })
}