// import _Math from '../_math'
const _math = require('../_math')
const _log = require('../_log')

class DisguiseObj {
    constructor(obj, obj1, obj2) {
        this.sourceObj = obj
        this.sourceFrame = obj1
        this.targetFrame = obj2
        return this.interfaceObject()
    }
    /**
     * 检查数据结构是否与源数据相符
     * @param {源数据} obj 
     * @param {源数据需要的数据结构} obj1 
     */
    checkStructure(obj, obj1) {
        for (let item in obj1) {
            if (obj[item] === undefined) {
                return false
            } else {
                this.checkStructure(obj[item], obj1[item])
            }
        }
        return true
    }
    /**
     * 根据key值,返回源对象的定位路径
     * @param {源对象} obj 
     * @param {搜索的key值} key 
     * @param {搜索的path值} obj定位的路径 
     */
    getValueFromKey(obj, key, path) {
        for (let item in obj) {
            if (item === key) {
                path === undefined ? path = [item] : path.push(item)
                return {
                    state: 1, //存在key值
                    data: obj[item], //key值对应的的value
                    path: path //key值在源对象的指定路径
                }
            }
            if (obj[item].constructor.name == 'Object') {
                // 进行递归处理
                let oldPath = (path === undefined ? [] : JSON.parse(JSON.stringify(path)))
                path === undefined ? path = [item] : path.push(item)
                let res = this.getValueFromKey(obj[item], key, path)
                if (res.state == 1) {
                    return res
                } else if (res.state == 0) {
                    path = oldPath
                }
            }
        }
        return {
            state: 0 //  不存在key值
        }
    }
    // 根据给的对象根路径-数组,定位源对象中的数据
    getSourceValue(obj, path) {
        for (let item of path) {
            obj = obj[item]
        }
        return obj
    }
    setPathValue(obj,path,value){
        if(path.length==1){
            obj[path[0]]=value
        }else if(path.length>1){
            obj[path[0]]=this.setPathValue(obj[path[0]],path.splice(0,1),value)
        }
        return obj
    }
    /**
     * 递归目标对象的数据结构,若根key值对应的字符串为源对象的key值,则返回替换赋值的新对象
     * @param {源对象} obj 
     * @param {源对象的数据结构} obj1 
     * @param {目标对象的数据结构} obj2 
     */
    recursionKeyString(obj, obj1, obj2) {
        for (let item in obj2) {
            // key值对应的值为字符串时
            if (obj2[item].constructor.name == 'String') {
                let res = this.getValueFromKey(obj1, obj2[item])
                if (res.state === 1) {
                    obj2[item] = this.getSourceValue(obj, res.path)
                }
            } else if (obj2[item].constructor.name == 'Object') {
                obj2[item] = this.recursionKeyString(obj, obj1, obj2[item])
            }
        }
        return obj2
    }
    /**
     * 寻找对象中key值为数组的,且数组中为对象的
     * @param {源数据} obj 
     * @param {键} key 
     * @param {键对应的路径} path 
     */
    recursionSearchArray(obj, key, path) {
        for (let item in obj) {
            if (obj[item].constructor.name == 'Array') {
                path === undefined ? path = [item] : path.push(item)
                if (obj[item][0].constructor.name == 'Object') {
                    let res = this.getValueFromKey(obj[item][0], key)
                    if (res.state == 1) {
                        return {
                            state: 1,
                            data: obj[item], //obj中对应的值
                            path: path, //key值对应的路径
                            key: res.path
                        }
                    }
                }
            } else if (obj[item].constructor.name == 'Object') {
                // 进行递归处理
                let oldPath = (path === undefined ? [] : JSON.parse(JSON.stringify(path)))
                path === undefined ? path = [item] : path.push(item)
                let res = this.recursionSearchArray(obj[item], key, path)
                if (res.state == 1) {
                    return res
                } else if (res.state == 0) {
                    path = oldPath
                }
            }
        }
        return {
            state: 0
        }
    }
    /**
     * 递归新数据结构的数组的对象,以返回含有源数据的数组
     * @param {源数据} obj 
     * @param {源数据结构} obj1 
     * @param {遍历的新数据结构中数组内的对象} oo 
     * @param {遍历的新数据结构中数组最长的长度} i 
     */
    recursionObjFromArray(obj,obj1,oo,i){
        for (let item in oo) {
            if(oo[item].constructor.name=='String'){
                let res = this.recursionSearchArray(obj1, oo[item])
                if (res.state == 0) continue;
                let data = this.getSourceValue(obj, res.path)
                if (data.length > i) {
                    oo=this.setPathValue(oo,[item],this.getSourceValue(data[i], res.key))
                }
            }else if(oo[item].constructor.name=='Object'){
                oo[item]=this.recursionObjFromArray(obj,obj1,oo[item],i)
            }
        }
        return oo
    }
    /**
     * 递归目标对象的数据结构,若根key值对应的为数组对象
     * @param {源对象} obj 
     * @param {源对象的数据结构} obj1 
     * @param {目标对象的数据结构} obj2 
     */
    recursionKeyArray(obj, obj1, obj2) {
        for (let item in obj2) {
            if (obj2[item].constructor.name == 'Array') {
                let reBuildArr = []
                let sonObj2 = obj2[item][0]
                let sonobj1 = {}
                for (let item1 of obj2[item]) {
                    if (item1.constructor.name == 'String') {
                        // 数组中的为字符串
                        let res = this.recursionSearchArray(obj1, item1)
                        if (res.state == 1) {
                            let data = this.getSourceValue(obj, res.path)
                            data.forEach((ele) => {
                                reBuildArr.push(this.getSourceValue(ele, res.key))
                            })
                        } else {
                            // 若该值在源对象非数据的树中能找到
                            res = this.getValueFromKey(obj, item1)
                            if (res.state == 1) {
                                if (res.data.constructor.name == 'Array') {
                                    reBuildArr = [...reBuildArr, ...res.data]
                                } else {
                                    reBuildArr.push(res.data)
                                }
                            }
                        }
                    } else if (item1.constructor.name == 'Object') {
                        let o = JSON.parse(JSON.stringify(item1))
                        let arrLengthArr = []
                        // 若数组中的为对象
                        for (let item2 in item1) {
                            if (item1[item2].constructor.name == 'String') {
                                let res = this.recursionSearchArray(obj1, item1[item2])
                                if(res.state==1){
                                    console.log(res)
                                    arrLengthArr.push(this.getSourceValue(obj, res.path).length)
                                }
                            }
                        }
                        if (arrLengthArr.length == 0) continue;
                        // 获取数组长度
                        let arrLength = _math.max(arrLengthArr)
                        for (let i = 0; i < arrLength; i++) {
                            let oo = JSON.parse(JSON.stringify(o))
                            oo=this.recursionObjFromArray(obj,obj1,oo,i)
                            reBuildArr.push(oo)
                        }
                    }
                }
                obj2[item] = reBuildArr
            } else if (obj2[item].constructor.name == 'Object') {
                obj2[item] = this.recursionKeyArray(obj, obj1, obj2[item])
            }
        }
        return obj2
    }
    // 去除已赋值的字符串对象
    breakFrame(frame) {
        for (let item in frame) {
            if (frame[item].constructor.name == 'String' || frame[item].constructor.name == 'Number' || frame[item].constructor.name == 'Boolean' || frame[item].constructor.name == 'Function') {
                delete frame[item]
            } else if (frame[item].constructor.name == 'Object') {
                frame[item] = this.breakFrame(frame[item])
            }
        }
        return frame
    }
    // 去除已删除的对象结构中的空对象
    checkBreakFrame(frame) {
        for (let item in frame) {
            if (frame[item].constructor.name == 'Object' && JSON.stringify(frame[item]) == '{}') {
                delete frame[item]
            }
        }
        return frame
    }
    /**
     * 将原对象结构按照新的数据结构转化
     * @param {源对象} obj 
     * @param {源对象的数据结构} obj1 
     * @param {目标对象的数据结构} obj2 
     */
     interfaceObject() {
        // 校验第一个参数为对象
        if (this.sourceObj.constructor.name != 'Object') {
            _log.warn("对象转变结构:第一参数(源数据)为非对象数据类型")
            return this.sourceFrame
        }

        // 校验第二个参数的数据结构正确
        if (!this.checkStructure(this.sourceObj, this.sourceFrame)) {
            _log.warn("对象转变结构:第二参数结构有误")
            return this.sourceFrame
        }
        let breakTargetFrame = this.checkBreakFrame(this.breakFrame(JSON.parse(JSON.stringify(this.targetFrame))))
        // key值对应的值为字符串时
        let data1 = this.recursionKeyString(this.sourceObj, this.sourceFrame, this.targetFrame)
        // key值对应的值为数组时
        let data2 = this.recursionKeyArray(this.sourceObj, this.sourceFrame, breakTargetFrame)

        return Object.assign(data1, data2)
    }
}

const disguiseObj = (obj, obj1, obj2) => {
    return new DisguiseObj(obj, obj1, obj2)
}

const Obj={
    aa:1,
    bb:['12','123'],
    cc:[{
        aaa:'123',
        bbb:{
            ccc:'456'
        }
    },{
        aaa:'1234',
        bbb:{
            ccc:'4567'
        }
    }]
}

let x=disguiseObj(Obj,{
    aa:Number,
    bb:Array,
    cc:[{
        aaa:String,
        bbb:{
            ccc:String
        }
    }]
},{
    // zz:['bb'],
    // mm:'bb',
    nn:{
        yy:[{
            // xx:'aaa',
            // iii:'ccc',
            uuu:'bb'
        }]
    }
})

console.log(JSON.stringify(x))