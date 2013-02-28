/**
 * Created with JetBrains WebStorm.
 * User: zhd
 * Date: 12-11-12
 * Time: 下午3:49
 * To change this template use File | Settings | File Templates.
 */
var KTGUID = function(g){
    this.Init(g);
};

KTGUID.prototype.arr = null;

KTGUID.Empty = function(){
    return new GUID();
};

KTGUID.NewGuid = function(){
    var g="";
    var i=32;
    while(i--){
        g+=Math.floor(Math.random()*16.0).toString(16);
    };
    return new KTGUID(g);
};

KTGUID.prototype.Init = function(g){
    this.arr = new Array();

    if(typeof(g) == "string"){
        this.InitByString(this.arr, g);
    }
    else{
        this.InitByOther(this.arr);
    }
};

KTGUID.prototype.Equals = function(guid){
    if(guid != null){
        return this.ToString() == guid.ToString();
    }
    return false;
};

KTGUID.prototype.InitByString = function(array, g){
    g = g.replace(/\{|\(|\)|\}|-/g, "");
    g = g.toLowerCase();
    if(g.length != 32 || g.search(/[^0-9,a-f]/i) != -1){
        this.InitByOther(array);
    }
    else{
        for(var i=0; i< g.length; i++){
            array.push(g[i]);
        }
    }
};

KTGUID.prototype.InitByOther = function(array){
    var i =32;
    while(i--){
        array.push("0");
    }
};

KTGUID.prototype.IsGuid = function(){};

KTGUID.prototype.ToString = function(format){
    if(typeof(format) == "string"){
        if(format == "N" || format == "D" || format == "B" || format == "P"){
            return this.ToStringWithFormat(this.arr, format);
        }
        else{
            return this.ToStringWithFormat(this.arr, "D");
        }
    }
    else{
        return this.ToStringWithFormat(this.arr, "D");
    }
};

KTGUID.prototype.ToStringWithFormat = function(array, format){
    switch(format){
        case "N":
            return array.toString().replace(/,/g, "");
        case "D":
            var str = array.slice(0, 8) + "-" + array.slice(8, 12) + "-" + array.slice(12, 16) + "-" + array.slice(16, 20) + "-" + array.slice(20,32);
            str = str.replace(/,/g, "");
            return str;
        case "B":
            var str = ToStringWithFormat(array, "D");
            str = "{" + str + "}";
            return str;
        case "P":
            var str = ToStringWithFormat(array, "D");
            str = "(" + str + ")";
            return str;
        default:
            return new KTGUID();
    }
};