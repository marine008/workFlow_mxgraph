//---象初始化函数---开始---
var kingtopGraphFlow = function (divId) {
    //获取容器对象
    var container = document.getElementById(divId);
    //屏蔽浏览器所带的菜单
    mxEvent.disableContextMenu(container);
    //设置捕捉
    mxGraphHandler.prototype.guidesEnabled = true;

    //设置模型
    var model = new mxGraphModel();
    this._graph = new mxGraph(container, model);

    //获取连接线的样式
    var style = this._graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;

    //设置可以进行链接操作
    this._graph.setConnectable(this.Connectable);
    mxConnectionHandler.prototype.connectImage = new mxImage(this.ConnectImage, this.ConnectImageHeight, this.ConnectImageWidth);
    //设置两个相同的对象不能连接两次
    this._graph.setMultigraph(this.Multigraph);

    //添加自定义菜单
    var flow = this;
    this._graph.panningHandler.factoryMethod = function (menu, cell, evt) {
        return flow._createPopupMenu(flow._graph, menu, cell, evt);
    };

    return this._graph;
};
//---象初始化函数---结束---

//---对象属性方法---开始---
kingtopGraphFlow.prototype = {
    Connectable: true,
    Multigraph: false,
    ConnectImage: './././src/images/green-dot.gif',
    ConnectImageHeight: 12,
    ConnectImageWidth: 12,
    _graph: null,

    //--------------------------
    _createPopupMenu: function (graph, menu, cell, evt) {
        var model = graph.getModel();

        if (cell != null) {
            //if (model.isVertex(cell)) {
            //}
            var flow = this;
            menu.addItem('Del Item', './././src/images/error.gif', function () {
                flow._DelItem(cell);
            });
        }
    },

    //--------------------------
    _DelItem: function (cell) {
        var model = this._graph.getModel();

        model.beginUpdate();
        try {
            model.remove(cell);
        }
        finally {
            model.endUpdate();
        }
    },

    //--------------------------
    KTSetPanning: function (bool) {
        alert(111);
        this._graph.setPanning(bool);
        this._graph.useLeftButtonForPanning = bool;
    },

    //--------------------------
    KTExportToXML: function () {
        var enc = new mxCodec(mxUtils.createXmlDocument());
        var node = enc.encode(this._graph.getModel());
        return mxUtils.getPrettyXml(node);
    },

    KTLoadFlowXML: function (xml) {
        var doc = mxUtils.parseXml(xml);
        var node = doc.documentElement;

        var dec = mxCodec(node.ownerDocument);
        if (node.nodeName == "mxGraphModel") {
            alert(node.nodeName);
            dec.decode(node, this._graph.getModel());
        }
    }
};
//---对象属性方法---结束---