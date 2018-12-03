// 日志错误信息
class _log {
    isChrome() {
        try{
            if (navigator.userAgent.indexOf('Chrome') != -1) {
                return true;
            } else {
                return false;
            }
        }catch(err){
            return false;
        }
    }
    isString(str) {
        return (typeof str == 'string') && str.constructor == String;
    }
    isConsole(str) {
        if (this.isChrome() && this.isString(str)) {
            return true;
        } else {
            console.log(str)
            return false;
        }
    }
    error(str) {
        console.log(this.isConsole(str))
        if (this.isConsole(str)) {
            console.log(`%c ${str}`, 'color:#ed4014')
        }
    }
    info(str) {
        if (this.isConsole(str)) {
            console.log(`%c ${str}`, 'color:#2db7f5')
        }
    }
    success(str){
        if (this.isConsole(str)) {
            console.log(`%c ${str}`, 'color:#19be6b')
        }
    }
    warn(str) {
        if (this.isConsole(str)) {
            console.log(`%c ${str}`, 'color:#ff9900')
        }
    }
}
export default new _log()
