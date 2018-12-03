// 显示错误信息弹窗
class _Msg {
    domId = "tipsBox"
    constructor() {}
    show(msg, color) {
      if (document.getElementById(this.domId)) {
          document.getElementById(this.domId).remove()
      }
      let tipsBox = document.createElement('div')
      tipsBox.id = this.domId
      let tips = document.createElement('div')
      tips.style.background = color
      tips.innerHTML = msg
      tipsBox.appendChild(tips)
      // 将传入内容字符串转化，防攻击处理
      // if(msg.constructor.name=='Array'){
      //   for(let item of msg){
      //     item=JSON.stringify(item)
      //   }
      //   msg=msg.join('<br/>')
      // }else{
      //   msg=JSON.stringify(msg)
      // }
      // 出现的动画
      document.body.appendChild(tipsBox)
      // 位置动画
      move.easeIn([-40, 0], 300, (v) => {
          document.getElementById(this.domId).firstChild.style.top = v + 'px'
      })
      // 透明度变化
      move.easeIn([0, 1], 300, (v) => {
          document.getElementById(this.domId).firstChild.style.opacity = v
      })
      // 消失的动画
      setTimeout(() => {
          move.easeOut([1, 0], 200, (v) => {
              document.getElementById(this.domId).firstChild.style.opacity = v
          }, () => {
              if(document.getElementById(this.domId)){
                  document.getElementById(this.domId).remove()
              }
          })
      }, 2000)
    }
    error(msg) {
      this.show(msg, '#ff3333')
    }
}
export default new _Msg()
