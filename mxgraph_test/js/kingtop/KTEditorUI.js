/**
 * Created with JetBrains WebStorm.
 * User: zhd
 * Date: 12-11-26
 * Time: 下午4:54
 * To change this template use File | Settings | File Templates.
 */
var KTEditorUI = function(containerDivId, graphDivId, sidebarDivId, propertyDivId){
    var container = document.getElementById(containerDivId) || document.body;
    var graphContainer = document.getElementById(graphDivId);
    var sidebarContainer = document.getElementById(sidebarContainer);
    var propertyContainer = document.getElementById(propertyContainer);

    //////////////////////////////
    this.graph = new KTGraph(graphContainer);
    var permission = new KTGraphPermission(this.graph);
    var context = new KTContextMenu(this.graph);

    var sidebar = new KTSidebar(sidebarContainer, this.graph);
    var userObj = new KTUserObject(sidebar);
    userObj.init();

    var propertygrid = new KTPropertygrid(propertyContainer, this.graph);
    propertygrid.transfer = function(nodeName){
        return userObj.transferToChinese(nodeName);
    };
    propertygrid.Init();
    //////////////////////////////
};

KTEditorUI.prototype.graph = null;
