/**
 * Created with JetBrains WebStorm.
 * User: zhd
 * Date: 12-11-8
 * Time: 上午10:28
 * To change this template use File | Settings | File Templates.
 */
var KTToolbar = function(container, graph){
    mxToolbar.call(this, container);

    this.graph = graph;
};

mxUtils.extend(KTToolbar, mxToolbar);

KTToolbar.prototype._container = null;
KTToolbar.prototype.graph = null;

KTToolbar.prototype.createLabel = function(labelName){
    var elt = document.createElement('a');
    elt.setAttribute('href','javascript:void(0);');
    elt.className = 'ktLable';
    mxUtils.write(elt, labelName);
    return elt;
};

KTToolbar.prototype.createButton = function(className){
    var elt = document.createElement('a');
    elt.setAttribute('href','javascript:void(0)');
    elt.className = 'ktButton';

    var inner = document.createElement('div');
    inner.className = 'ktSprite'+className;
    elt.appendChild(inner);

    return elt;
};