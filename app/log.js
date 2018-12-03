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
            return false;
        }
    }
    error(str) {
        if (this.isConsole(str)) {
            console.log(`%c ${str}`, 'color:#ff0000')
        }else{
            console.error(str)
        }
    }
    info(str) {
        if (this.isConsole(str)) {
            console.log(`%c ${str}`, 'color:#ff0000')
        }else{
            console.info(str)
        }
    }
    warn(str) {
        if (this.isConsole(str)) {
            console.log(`%c ${str}`, 'color:#ff0000')
        }else{
            console.warn(str)
        }
    }
}

export default new _log()
