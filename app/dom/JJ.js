/**
 * JJ方法
 **/
class JJ {
    constructor(str) {
        this.domName = str; // 选择器字符串
        this.elements = document.querySelectorAll(this.domName);
        return this;
    }
    /*
     * 延时寻找dom
     * delayFindDom((ele,index)=>{
     *   ...
     * },300)
     **/
    delayFindDom(fn, time) {
        let timeVal = time ? time : 300;
        this.elements = document.querySelectorAll(this.domName);
        let _this = this;
        if (!_this.elements || _this.elements.length == 0) {
            setTimeout(() => {
                _this.delayFindDom(fn, time);
            }, timeVal)
        } else {
            _this.map(fn)
        }
    }
    /*
     * 延时寻找dom
     * pollingFindDom((ele,index)=>{
     *   ...
     * },300)
     **/
    pollingFindDom(fn, time) { //  轮询寻找dom
        let timeVal = time ? time : 300;
        this.elements = document.querySelectorAll(this.domName);
        let _this = this;
        setInterval(() => {
            if (_this.elements && _this.elements.length > 0) {
                let _this = this;
                _this.map(fn)
            }
        }, timeVal)
    }
    /*
     * 遍历dom
     * JJ('a').map((ele,index)=>{
     * ...
     * })
     **/
    map(fn) {
        Array.prototype.map.call(this.elements, (ele, index) => {
            fn(ele, index);
        });
    }
    /**
     * 绑定事件
     * @param {event名称} evnt 
     * @param {绑定的时间} fn
     * JJ('a').addEvent('click',function(e){
     * ...
     * })
     */
    addEvent(evnt, fn) {
        this.map((element, index) => {
            if (!element) console.log('dom can not be find');
            if (element.attachEvent) { // IE < 9
                return element.attachEvent('on' + evnt, fn);
            } else {
                return element.addEventListener(evnt, fn, false);
            }
        })
    }
    /** 
     * 设置样式 
     * @param {HTMLElement} elem 需要设置的节点 
     * @param {Object} prop      CSS属性，键值对象 
     */
    setStyle(prop) {
        this.map((elem, index) => {
            if (!elem) {
                return false
            }
            for (let i in prop) {
                elem.style[i] = prop[i];
            }
        })
    }
}
export default (str) => new JJ(str)