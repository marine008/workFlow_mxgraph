/**
 * Created with JetBrains WebStorm.
 * User: zhd
 * Date: 12-11-9
 * Time: 下午4:22
 * To change this template use File | Settings | File Templates.
 */
var KTContextMenu = function(graph){
    this.graph = graph;
    var graphContainer = graph.container;
    mxEvent.disableContextMenu(graphContainer);

    var thisContextMenu = this;
    this.graph.panningHandler.factoryMethod = function(menu, cell, evt) {
        return thisContextMenu.createPopupMenu(menu, cell, evt);
    };
}

KTContextMenu.prototype.graph = null;

KTContextMenu.prototype.createPopupMenu = function(menu, cell, evt){
    var model = this.graph.getModel();

    if(cell != null){
        var thisContextMenu = this;
        menu.addItem('删除对象', './././src/images/error.gif', function(){
            thisContextMenu.delItem(cell);
        });
    }
};

KTContextMenu.prototype.delItem = function(cell){
    var model = this.graph.getModel();

    model.beginUpdate();
    try{
        model.remove(cell);
    }
    finally{
        model.endUpdate();
    }
};
