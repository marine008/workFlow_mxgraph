/**
 * Created with JetBrains WebStorm.
 * User: zhd
 * Date: 12-11-15
 * Time: 下午2:08
 * To change this template use File | Settings | File Templates.
 */

var KTUserObjPermission = function(graph){
    this.graph = graph;
};

KTUserObjPermission.prototype.graph = null;

KTUserObjPermission.prototype.InitMultiplicities = function(){
    this.graph.multiplicities.push(new mxMultiplicity(true,"UserNode", "nodetype", "begin", 1,2, ["UserNode"],"节点错误","类型错误"));
    this.graph.multiplicities.push(new mxMultiplicity(false,"UserNode", "nodetype", "begin", 0,0, null,"开始节点不存在输入项",null));
    this.graph.multiplicities.push(new mxMultiplicity(true,"UserNode", "nodetype", "end", 0,0, null,"结束节点不存在输出项",null));

    var curObj = this;
    this.graph.getModel().addListener(mxEvent.CHANGE, function(sender, evt){
        curObj.graph.validateGraph();
    });
};