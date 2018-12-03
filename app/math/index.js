class _Math {
    constructor() {
        return '自定义的数学方法'
    }
    // 将参数中非数字类型的去除，整理为一维只包含数字类型的数组
    arrange() {
        let arr = []
        for (let item of [...arguments]) {
            switch (item.constructor.name) {
                case 'String':
                    item = parseInt(item)
                    if (isNaN(item)) {
                        console.warn('_math.max:含有非数字的参数')
                    } else {
                        arr.push(item)
                    }
                    break
                case 'Array':
                    arr = [...arr, ...item]
                    break
                case 'Number':
                    arr.push(item)
                    break
                default:
                    console.warn('_math.max:含有不可操作参数')
                    break
            }
        }
        // console.log(arr)
        return arr
    }
    // 取最大值
    max() {
        if (arguments.length == 0) {
            console.warn('_math.max:没有数字')
            return false
        } else {
            return Math.max(...this.arrange(...arguments))
        }
    }
    // 取最小值
    min() {
        if (arguments.length == 0) {
            console.warn('_math.max:没有数字')
            return false
        } else {
            return Math.min(...this.arrange(...arguments))
        }
    }
    // 金额两位小数
    moneyToFixed2(rmb) {
        rmb = rmb + "";
        var numLength = rmb.length;
        if (numLength > 3) {
            var rmb1 = rmb.substring(0, numLength - 2);
            var rmb2 = rmb.substring(numLength - 2);
            return rmb1 + "." + rmb2
        } else if (numLength == 3) {
            var rmb1 = rmb.substring(0, 1);
            var rmb2 = rmb.substring(1);
            return rmb1 + "." + rmb2
        } else if (numLength == 2) {
            return "0." + rmb;
        } else if (numLength == 1) {
            return "0.0" + rmb;
        }
    }
    // 千位符转换
    thousandRmbTrafer(rmb) {
        rmb = rmb + "";
        var numLength = rmb.length;
        if (numLength > 5) {
            var rmb1 = rmb.substring(0, numLength - 2);
            var rmb2 = rmb.substring(numLength - 2);
            rmb1 = rmb1.split("").reverse();
            for (i = 1; i < (numLength - 2); i++) {
                if (i % 3 == 0) {
                    rmb1[i] = rmb1[i] + ","
                }
            }
            rmb1.reverse();
            rmb1 = rmb1.join("");
            return rmb1 + "." + rmb2;
        } else if (numLength > 3) {
            var rmb1 = rmb.substring(0, numLength - 2);
            var rmb2 = rmb.substring(numLength - 2);
            return rmb1 + "." + rmb2
        } else if (numLength == 3) {
            var rmb1 = rmb.substring(0, 1);
            var rmb2 = rmb.substring(1);
            return rmb1 + "." + rmb2
        } else if (numLength == 2) {
            return "0." + rmb;
        } else if (numLength == 1) {
            return "0.0" + rmb;
        }

    }
}
export default new _Math()