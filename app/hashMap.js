/**
 * hashmap方法便利数据，插入/删除数据较快，数组查询数据较快
 * @constructor
 * var hashMap=new HashMap() --new HashMap 新建立一个实例
 * hashMap.put("key","value") --插入值
 * hashMap.get("key","value") --获取值
 * hashMap.remove("key")  --删除值
 * hashMap.values --获取所有value /arr
 * hashMap.keySet --获取所有key值 /arr
 * hashMap.size --获得Map的长度
 * hashMap.clear  --清空
 * hashMap.isEmpty --判断是否为空
 * hashMap.containsKey("key") --是否包含key
 * hashMap.containsValue("value") --是否包含value
 */
function HashMap(){
    //定义长度
    var length = 0;
    //创建一个对象
    var obj = new Object();
  
    /**
     * 判断Map是否为空
     */
    this.isEmpty = function(){
      return length == 0;
    };
  
    /**
     * 判断对象中是否包含给定Key
     */
    this.containsKey=function(key){
      return (key in obj);
    };
  
    /**
     * 判断对象中是否包含给定的Value
     */
    this.containsValue=function(value){
      for(var key in obj){
        if(obj[key] == value){
          return true;
        }
      }
      return false;
    };
  
    /**
     *向map中添加数据
     */
    this.put=function(key,value){
      if(!this.containsKey(key)){
        length++;
      }
      obj[key] = value;
    };
  
    /**
     * 根据给定的Key获得Value
     */
    this.get=function(key){
      return this.containsKey(key)?obj[key]:null;
    };
  
    /**
     * 根据给定的Key删除一个值
     */
    this.remove=function(key){
      if(this.containsKey(key)&&(delete obj[key])){
        length--;
      }
    };
  
    /**
     * 获得Map中的所有Value
     */
    this.values=function(){
      var _values= new Array();
      for(var key in obj){
        _values.push(obj[key]);
      }
      return _values;
    };
  
    /**
     * 获得Map中的所有Key
     */
    this.keySet=function(){
      var _keys = new Array();
      for(var key in obj){
        _keys.push(key);
      }
      return _keys;
    };
  
    /**
     * 获得Map的长度
     */
    this.size = function(){
      return length;
    };
  
    /**
     * 清空Map
     */
    this.clear = function(){
      length = 0;
      obj = new Object();
    };
  }
  