//KTGraph的构造函数
var KTGraph = function (container, mode, model, renderHint) {
    mxGraph.call(this, container, model, renderHint);

    if(mode == null || mode == "normal")
    {
        this.initNormal();
    }
    else if(mode == "readonly"){
        this.initReadonly();
    }
};

//继承mxGraph对象类
mxUtils.extend(KTGraph, mxGraph); 

//--------------------------KTGraph的属性方法
KTGraph.prototype.overLayImage = 'src/images/warning.png';

//初始化正常编辑模式
KTGraph.prototype.initNormal = function(){
    this.setConnectable(true); //可连接
    //this.setDropEnabled(true); //可拖拽
    this.setPanning(true); //可移动
    this.setTooltips(true); //显示提示信息
    //this.setAllowLoops(true);
    this.setAllowDanglingEdges(false);//不允许空悬挂线存在
    this.setMultigraph(false);//设置两个相同的对象不能连接两次
    this.allowAutoPanning = true;

    //this.connectionHandler.setCreateTarget(true); //自动创建连接对象，如果连接方没有对象的话
    mxGraphHandler.prototype.guidesEnabled = true;//设置捕捉
    //mxEvent.disableContextMenu(container);//屏蔽浏览器所带的菜单

    var rubberband = new mxRubberband(this); //橡皮筋技术

    //获取连接线的样式
    var style = this.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
};

//初始化只读模式
KTGraph.prototype.initReadonly = function(){
    //mxShape.prototype.crisp = true;
    this.centerZoom = false;
    this.setTooltips(false);
    this.setEnabled(false);
    this.setDropEnabled(true); //可拖拽

    this.panningHandler.useLeftButtonForPanning = true
    this.panningHandler.ignoreCell = true;
    this.container.style.cursor = "move";
    this.setPanning(true);
    this.resizeContainer = false;
};

//加载样式文件
KTGraph.prototype.loadStylesSheet = function(stylePath){
    //加载样式表；
    var node = mxUtils.load(stylePath).getDocumentElement();
    var dec = new mxCodec(node.ownerDocument);
    dec.decode(node, this.getStylessheet());
};

//数值转换为字符串
KTGraph.prototype.convertValueToString=function(cell){
    //转换数据为字符串类型；
    if (cell.value != null && typeof (cell.value) == 'object')
        return cell.value.getAttribute('label');
    return mxGraph.prototype.convertValueToString.apply(this, arguments);
};

//从xml文件加载模型信息（删除原有的模型信息）
KTGraph.prototype.loadFromXml = function(xml){
    //加载xml文件，如果是正确的xml文件，则进行图形绘制
    var xmlDocument = mxUtils.parseXml(xml);
    var decoder = new mxCodec(xmlDocument);
    var node = xmlDocument.documentElement;
    if(node.nodeName == 'mxGraphModel'){
        decoder.decode(node, this.getModel());
    }
};

//从xml文件导入模型信息（不删除原有的模型信息）
KTGraph.prototype.importFromXml = function(xml){
    var doc = mxUtils.parseXml(xml);
    var node = doc.documentElement;

    var decoder = new mxCodec(node.ownerDocument);
    if (node.nodeName == 'mxGraphModel') {
        decoder.decode(node, this.getModel());
    }
}

//将当前所绘的模型导出成xml文件
KTGraph.prototype.exportToXml = function(){
    //将当前所绘制的图形转换成xml文件输出；
    var encode = new mxCodec(mxUtils.createXmlDocument());
    var node = encode.encode(this.getModel());
    return mxUtils.getPrettyXml(node);
};

//要素查找
KTGraph.prototype.findCell = function(attributeName, attributeValue){
    var model = this.getModel();
    var containerNode = model.root.children[0];//需要再验证
    var nodes = model.getChildCells(containerNode, true, false);
    for(var i=0; i<nodes.length; i++){
        var node = nodes[i];
        var attribute = node.value.getAttribute(attributeName);
        if(attribute.valueOf() == attributeValue){
            return node;
        }
    }
};

//更新节点显示状态
KTGraph.prototype.updateCell = function(cell){
    if(cell != null){
        var model = this.getModel();
        model.beginUpdate();

        try{
            //调整颜色样式
            this.setCellStyles(mxConstants.STYLE_FILLCOLOR, '#FFAF1B', [cell]);

            //添加悬浮层
            var overlays = this.getCellOverlays(cell);
            if(overlays == null){
                var overlay = new mxCellOverlay(new mxImage(this.overLayImage,16,16), '您当前所处环节');
                this.addCellOverlay(cell, overlay);
            }
            else{
                this.removeCellOverlays(cell);
            }
        }
        catch (e){
            alert('更新节点状态出错!');
        }
        finally{
            model.endUpdate();
        }
    }
};

//内部方法，删除某个要素
KTGraph.prototype._delItem = function(cell){
    var model = this.getModel();
    model.beginUpdate();
    try{
       model.removeCell(cell);
    }
    catch (e){
        alert("移除要素错误："+ e);
    }
    finally{
        model.endUpdate();
    }
};
//--------------------------KTGraph的属性方法