
var kingtopGraphUserObj = function (toolbar) {
    this._toolbar = toolbar;
    this._graph = toolbar.graph;

    //获取Label的信息值
    this._graph.convertValueToString = function (cell) {
        if (mxUtils.isNode(cell.value)) {
            return cell.getAttribute('name', '');
        }
        return "未知";
    };

    //Label的信息修改事件
    var oldCellLabelChanged = this._graph.cellLabelChanged;
    this._graph.cellLabelChanged = function (cell, newValue, autoSize) {
        if (mxUtils.isNode(cell.value)) {
            var elt = cell.value.cloneNode(true);
            elt.setAttribute('name', newValue);
            newValue = elt;
            autoSize = true;
        }
        oldCellLabelChanged.apply(this, arguments);
    };
}

kingtopGraphUserObj.prototype = {
    _toolbar: null,
    _graph: null,

    Init: function () {
        var doc = mxUtils.createXmlDocument();

        var node = doc.createElement("BeginNode");
        node.setAttribute("sn", "");
        node.setAttribute("name", "开始");
        node.setAttribute("flowsn", "");
        node.setAttribute("nodetype", "begin");
        node.setAttribute("nodeovertime", "");
        node.setAttribute("description", "开始");
        node.setAttribute("userids", "");
        node.setAttribute("roleids", "");
        node.setAttribute("isauto", "false");
        node.setAttribute("application", "");
        node.setAttribute("extraproperty", "");
        node.setAttribute("remark", "");
        this._toolbar.AddUserVertext("src/images/rounded.gif", 100, 40, '', node);

        node = doc.createElement("EndNode");
        node.setAttribute("sn", "");
        node.setAttribute("name", "结束");
        node.setAttribute("flowsn", "");
        node.setAttribute("nodetype", "begin");
        node.setAttribute("nodeovertime", "");
        node.setAttribute("description", "结束");
        node.setAttribute("userids", "");
        node.setAttribute("roleids", "");
        node.setAttribute("isauto", "false");
        node.setAttribute("application", "");
        node.setAttribute("extraproperty", "");
        node.setAttribute("remark", "");
        this._toolbar.AddUserVertext("src/images/rounded.gif", 100, 40, '', node);

        node = doc.createElement("TaskNode");
        node.setAttribute("sn", "");
        node.setAttribute("name", "任务");
        node.setAttribute("flowsn", "");
        node.setAttribute("nodetype", "begin");
        node.setAttribute("nodeovertime", "");
        node.setAttribute("description", "任务节点");
        node.setAttribute("userids", "");
        node.setAttribute("roleids", "");
        node.setAttribute("isauto", "false");
        node.setAttribute("application", "");
        node.setAttribute("extraproperty", "");
        node.setAttribute("remark", "");
        this._toolbar.AddUserVertext("src/images/rounded.gif", 100, 40, '', node);
    },

    transferToChinese: function (enName) {
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
    },

    transferToEnglish: function (zhName) {
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
    }
}