const validateObj={
    account(val){//4到16位，字母，数字，下划线，减号
      var val=val.trim();
      if(val===""){
        return "请输入账号"
      }else if(val.length<4){
        return "账号名不正确"
      }else if(/^[a-zA-Z0-9_\-\.]{4,16}$/.test(val)){
        return true;
      }else{
        return "含有非法字符"
      }
    },
    password(val){
      var val=val.trim();
      if(val===""){
        return "请输入密码";
      }else if(/^[a-zA-Z0-9_\-\#\.@&!]{4,16}$/.test(val)){
        return true;
      }else{
        return "含有非法字符";
      }
    },
    phoneCode(val){
      var val=val.trim();
      if(val===""){
        return "请输入验证码";
      }else if(/^\d{6}$/.test(val)){
        return true;
      }else{
        return "验证码错误";
      }
    }
  
  }
  module.exports= validateObj;
  