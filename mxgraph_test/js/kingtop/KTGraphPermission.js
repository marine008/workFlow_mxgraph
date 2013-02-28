/**
 * Created with JetBrains WebStorm.
 * User: zhd
 * Date: 12-11-14
 * Time: 下午2:01
 * To change this template use File | Settings | File Templates.
 */

var KTGraphPermission = function(graph){
    this.graph = graph;
};

KTGraphPermission.prototype.graph = null;
KTGraphPermission.prototype.editEdges = false;
KTGraphPermission.prototype.editVertices = true;

KTGraphPermission.prototype.Init = function(){
    var currentObj = this;

    //节点是否可以移动
    var oldMovable = this.graph.isCellsMovable;
    this.graph.isCellMovable = function(cell){
        return oldMovable.apply(this, arguments) &&
            (currentObj.graph.getModel().isVertex(cell) &&
                currentObj.editVertices) ||
            (currentObj.graph.getModel().isEdge(cell) &&
                currentObj.editEdges);
    };

    //cell的终端点是否可以移动
    var oldTerminalPointMovable = this.graph.isTerminalPointMovable;
    this.graph.isTerminalPointMovable = function(cell){
        alert("TerminalPointMovable: "+currentObj.graph.getModel().isEdge(cell));
        return oldTerminalPointMovable.apply(this, arguments) &&
            (currentObj.graph.getModel().isVertex(cell) &&
                currentObj.editVertices) ||
            (currentObj.graph.getModel().isEdge(cell) &&
                currentObj.editEdges);
    };

    //节点间是否可以连接
    var oldDisconnectable = this.graph.isCellDisconnectable;
    this.graph.isCellDisconnectable = function(cell, terminal, source){
        return oldDisconnectable.apply(this, arguments) && this.editEdges;
    };

     /*
      //节点是否可以编辑
      var oldEditable = this.graph.isCellEditable;
      this.graph.isCellEditable = function(cell)
      {
      return oldEditable.apply(this, arguments) &&
      (currentObj.graph.getModel().isVertex(cell) &&
      currentObj.editVertices) ||
      (currentObj.graph.getModel().isEdge(cell) &&
      currentObj.editEdges);
      };

     //节点是否可以弯曲
    var oldBendable = this.graph.isCellBendable;
    this.graph.isCellBendable =function(cell){
        return oldBendable.apply(this, arguments) && currentObj.editEdges;
    };

    //字符是否可以移动
    var oldLabelMovable = this.graph.isLabelMovable;
    this.graph.isLabelMovable = function(cell)
    {
        return oldLabelMovable.apply(this, arguments) && currentObj.editEdges;
    };

    //cell的大小是否可以调整
    var oldResizable = this.graph.isCellResizable;
    this.graph.isCellResizable = function(cell)
    {
        return oldResizable.apply(this, arguments) && currentObj.editVertices;
    };

    //节点是否可以删除
    var oldDeletable = this.graph.isCellDeletable;
    this.graph.isCellDeletable = function(cell)
    {
        return oldDeletable.apply(this, arguments) &&
            (currentObj.graph.getModel().isVertex(cell) &&
                currentObj.editVertices) ||
            (currentObj.graph.getModel().isEdge(cell) &&
                currentObj.editEdges);
    };

    //cell是否可以拷贝
    var oldCloneable = this.graph.isCellCloneable;
    this.graph.isCellCloneable = function(cell)
    {
        return oldCloneable.apply(this, arguments) &&
            currentObj.cloneCells;
    };*/
};