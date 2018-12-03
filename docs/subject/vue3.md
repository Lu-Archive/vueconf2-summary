# vue 3.0 进展分享（尤雨溪）
- 大家可以直接前往观看尤大大的[在线视频](https://www.bilibili.com/video/av36787459/)
- [在线PPT](https://img.w3ctech.com/Vue3.0Updates.pdf)

## 更快
* Vitrual DOM完全重构，初始渲染/更新提速达100%
* 更多编译时的优化，以减少运行时的开销
  * 原来Vitrual DOM对于很多不会变动的节点，不可避免的要重新生成比对，现在通过编译时进行分析解决
  * 原来Vitrual DOM会直接将template中的代码作为字符串生成对应的Vitrual DOM代码，而在代码运行中去判断是否为原生标签还是组件，现在在编译时直接判断，如果是远程标签直接生成原生的Vitrual DOM
  * 函数调用尽可能有同样个数的参数，这样会更易于被JS引擎去优化
  * 在模板中直接静态的分析一个元素所包含的子元素的类型
  * 优化slots的生成，数据更新时，首先要更新父组件，父组件更新同时生成新的slot内容传到子组件，然后子组件也更新，意味着同时触发两个组件更新，现在都跟scope slot一样统一成为一个lazy的函数，当你把函数传给子组件之后，由子组件来决定什么时候调用这个函数，当子组件调用函数的时候，就只需要重新渲染子组件。
  * 静态内容提取，这部分内容直接提取出来，模板可以直接复用Vitrual DOM，连比对的dom树也直接跳过
    ```html
    <!-- Template -->
    <div id="foo" class="bar">
      {{ text }}
    </div>
    ```
    ```js
    //  Compiler output
    const __props1={
      id:'foo',
      class:'bar'
    }
    render(){
      return h('div',__props1,this.text)
    }
    ```
  * 内联事件函数提取，每次数据更新时都会生成新的函数,现在将函数cache起来
    ```html
    <!-- Template -->
    <Comp @event="count++"/>
    ```
    ```js
    //  Compiler output
    import { getBoundMethod } from 'vue'
    function __fn1(){
      this.count++
    }
    render(){
      return h(Comp,{
        onEvent:getBoundMethod(__fn1,this)
      })
    }
    ```
  * 基于[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)的数据监听系统
    * 基于Proxy的新数据监听系统 全语言特性 + 更好的性能
   
    * Vue 2用的是基于ES5的getter/setter，也就是Object.defineProperty的API。Vue 3里面基于proxy实现新的数据监听系统，可以将以下四点都支持。
        1. 对象属性增添/删除
        2. 数组index/length更改
        3. Map,Set,WeakMap,WeakSet
        4. Classes
    
    * 这个监听是所谓的Lazy by default,就是当只有一个数据被使用的时候，才会去监听他
    * 利用Proxy减少组件实例初始化开销，原来大量的Object.defineProperty是比较昂贵的开销,Vue 3中直接暴露的this,其实是一个真正的组件实例的一个Proxy，然后是当你实在这个Proxy上获取一些属性的时候，内部判断后避免了Object.defineProperty使用

## 更小
* 便于Tree-shaking的代码结构,Tree-shaking就是把没用的代码在最后编译的时候给扔掉，之前Vue的整个代码，只有一个Vue对象进来，所有东西都在里面。Vue 3中对以下做成了按需引入(ES module imports)，新的最小核心运行时：~10kb gzipped
  * 内置组件(keep-alive,transition...)
  * 指令的运行时 helper(v-model,v-for...)
  * 各种工具函数(asyncComponent,mixins,memoize...)

## 更易于维护
* 这是对于vue开发人员来说的
* 从Flow迁移到TypeScript
* 编译器重构
  * 插件化设计
  * 带位置信息的parser(source maps!)
  * 为更好的IDE工具链铺路
  
## 更好的多端渲染支持
* Custom Render API
    ```js
    import { createRenderer } from '@vue/runtime-core'
    const { render } = createRenderer({
      nodeOps,
      patchData
    })
    ```

## 新功能
* 响应式数据监听 API
    ```js
    import { observable, effect } from 'vue'
    const { render } = createRenderer({
      nodeOps,
      patchData
    })
    ```
* 轻松排查组件更新原因
    写上debugger，就可以直接看到是那一行触发的更新
    ```js
    const Comp={
      render(props){
        return h('div',props.count)
      },
      renderTiggered(event){
        debugger
      }
    }
    ```
* 更好的TypeScript支持，包括原声的Class API 和TSX
+ 更好的警告信息
  + 组件堆栈包含函数式组件
  + 可以直接在警告中查看组件的props
  + 在更多的警告中提供组件堆栈信息

+ Experimental Hooks API
  + 作为一种逻辑复用机制，大概率取代mixins，尤大大实验性质的[库链接](https://github.com/yyx990803/vue-hooks)
  
+ Experimental Time Slicing Suppot
  + 把javascript计算切割成一帧一帧（每16ms）的去运行，防止javascript运算量很大时导致浏览器线程阻塞而不能响应用户的操作
  + 我个人也试着用requestAnimationFrame原理实现了一下，有兴趣的可以查看一下[个人的github地址](https://github.com/Javison666/vue-timeSlicing-demo)

## 关于IE
+ 会有一个专门的版本，在IE中自动降级为旧的getter／setter机制，并对IE中不支持的用法给出警告（IE9、IE10理论上微软都已经宣判他们完蛋了，IE11还有好多年好多年好多年...）