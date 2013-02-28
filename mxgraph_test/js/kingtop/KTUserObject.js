/**
 * Created with JetBrains WebStorm.
 * User: zhd
 * Date: 12-11-9
 * Time: 下午2:44
 * To change this template use File | Settings | File Templates.
 */
var KTUserObject = function(sidebar){
    this.sidebar = sidebar;
    this.graph = sidebar.graph;

    //更改节点内容显示事件，更改为用户对象的某个属性值
    this.graph.convertValueToString = function (cell) {
        if (cell.value != null && typeof (cell.value) == 'object')
            return cell.value.getAttribute('name');
        return mxGraph.prototype.convertValueToString.apply(this, arguments);
    };

    //更改节点内容编辑事件，更改为更改用户对象的某个属性值
    var oldCellLabelChanged = this.graph.cellLabelChanged;
    this.graph.cellLabelChanged = function(cell, newValue, autoSize){
        if(mxUtils.isNode(cell.value)){
            var elt = cell.value.cloneNode(true);
            elt.setAttribute('name', newValue);
            newValue = elt;
            autoSize = false;
        }
        oldCellLabelChanged.apply(this, arguments);
    };

    //更改节点连接事件，更改默认连接线为用户自定义线
    var oldInsertEdge = mxConnectionHandler.prototype.insertEdge;
    var currentObj = this;
    mxConnectionHandler.prototype.insertEdge = function(parent, id, value, source, target){
        value = currentObj.createUserEdge();
        id = null;
        oldInsertEdge.apply(this, arguments);
    };

    /*var currentObj = this;
    var oldAddEdge = this.graph.addEdge;
    this.graph.addEdge = function(edge, parent, source, target, index){
        alert(111);
        var value = currentObj.createUserEdge();
        alert(value);
        edge = new mxCell((value != null) ? value : '', new mxGeometry(), style);
        alert(444);
        cells[0].edge = true;

        alert(333);
        oldAddEdge.apply(this, arguments);
    };*/

    //监听节点添加事件
    this.graph.addListener(mxEvent.CELLS_ADDED,function(sender, evt){
        var cells = evt.getProperty('cells'); // cell may be null

        if (!evt.isConsumed())
        {
            if (cells != null)
            {
                for(var i=0; i<cells.length; i++){
                    var cell = cells[i];
                    if(this.getModel().isVertex(cell)){
                        try{
                            var guid = KTGUID.NewGuid();
                            cell.setAttribute('sn', guid.ToString("N"));
                        }
                        catch(e){}
                    }
                }
            }
        }
    });
};

KTUserObject.prototype.sidebar = null;
KTUserObject.prototype.graph = null;

KTUserObject.prototype.userEdageNode = null;

//初始化用户节点对象
KTUserObject.prototype.init = function(){
    var doc = mxUtils.createXmlDocument();

    var node = doc.createElement("UserNode");
    node.setAttribute("sn", "");
    node.setAttribute("name", "开始");
    node.setAttribute("flowsn", "");
    node.setAttribute("nodetype", "Begin");
    node.setAttribute("nodeovertime", "");
    node.setAttribute("description", "开始");
    node.setAttribute("userids", "");
    node.setAttribute("roleids", "");
    node.setAttribute("isauto", "false");
    node.setAttribute("application", "");
    node.setAttribute("extraproperty", "");
    node.setAttribute("remark", "");
    this.sidebar.createVertex("src/images/rounded.gif", 100, 40, node);

    node = doc.createElement("UserNode");
    node.setAttribute("sn", "");
    node.setAttribute("name", "结束");
    node.setAttribute("flowsn", "");
    node.setAttribute("nodetype", "End");
    node.setAttribute("nodeovertime", "");
    node.setAttribute("description", "结束");
    node.setAttribute("userids", "");
    node.setAttribute("roleids", "");
    node.setAttribute("isauto", "false");
    node.setAttribute("application", "");
    node.setAttribute("extraproperty", "");
    node.setAttribute("remark", "");
    this.sidebar.createVertex("src/images/rounded.gif", 100, 40, node);

    node = doc.createElement("UserNode");
    node.setAttribute("sn", "");
    node.setAttribute("name", "任务");
    node.setAttribute("flowsn", "");
    node.setAttribute("nodetype", "Task");
    node.setAttribute("nodeovertime", "");
    node.setAttribute("description", "任务节点");
    node.setAttribute("userids", "");
    node.setAttribute("roleids", "");
    node.setAttribute("isauto", "false");
    node.setAttribute("application", "");
    node.setAttribute("extraproperty", "");
    node.setAttribute("remark", "");
    this.sidebar.createVertex("src/images/rounded.gif", 100, 40, node);
};

//初始化用户连接线对象
KTUserObject.prototype.createUserEdge = function(){
    var doc = mxUtils.createXmlDocument();

    var node = doc.createElement("UserEdge");
    node.setAttribute("sn", "");
    node.setAttribute("name", "通过");
    node.setAttribute("flowsn", "");
    node.setAttribute("description", "通过");
    node.setAttribute("extraproperty", "");
    node.setAttribute("value", "");

    return node;
};

KTUserObject.prototype.transferToChinese = function(enName){
    switch (enName) {
        case "sn":
            return "节点编码";
        case "name":
            return "节点名称";
        case "flowsn":
            return "流程编码";
        case "nodetype":
            return "节点类型";
        case "nodeovertime":
            return "办理时间";
        case "description":
            return "节点描述";
        case "userids":
            return "用户ID";
        case "roleids":
            return "角色ID";
        case "isauto":
            return "是否自动";
        case "application":
            return "对应程序";
        case "extraproperty":
            return "额外属性";
        case "remark":
            return "备注";
        default:
            return enName;
    }
};

KTUserObject.prototype.transferToEnglish = function(zhName){
    switch (zhName) {
        case "节点编码":
            return "sn";
        case "节点名称":
            return "name";
        case "流程编码":
            return "flowsn";
        case "节点类型":
            return "nodetype";
        case "办理时间":
            return "nodeovertime";
        case "节点描述":
            return "description";
        case "用户ID":
            return "userids";
        case "角色ID":
            return "roleids";
        case "是否自动":
            return "isauto";
        case "对应程序":
            return "application";
        case "额外属性":
            return "extraproperty";
        case "备注":
            return "remark";
        default:
            return zhName;
    }
};