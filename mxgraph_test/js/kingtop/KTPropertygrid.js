/**
 * Created with JetBrains WebStorm.
 * User: zhd
 * Date: 12-11-13
 * Time: 上午11:07
 * To change this template use File | Settings | File Templates.
 */

var KTPropertygrid = function(container, graph){
    this.graph = graph;
    this.container = container;
};

KTPropertygrid.prototype.graph = null;
KTPropertygrid.prototype.container = null;
KTPropertygrid.prototype._table = null;
KTPropertygrid.prototype._body = null;

KTPropertygrid.prototype.Init = function(){
    var currentObj = this;
    this.graph.getSelectionModel().addListener(mxEvent.CHANGE, function (sender, evt) {
        currentObj.selectionChange();
    });
};

KTPropertygrid.prototype.selectionChange = function(){
    this.graph.container.focus();

    this.container.innerHTML ="";
    var cell = this.graph.getSelectionCell();
    if(cell == null){
        mxUtils.writeln(this.container, '未选中');
    }
    else{
        var center = document.createElement('center');
        mxUtils.writeln(center, cell.value.nodeName + '('+cell.id+')');
        this.container.appendChild(center);
        mxUtils.br(this.container);

        var form = new mxForm();
         /*//this._createTable();
        var attrs = cell.value.attributes;
        for(var i=0; i<attrs.length; i++){
            this.createTextFiled(this.graph, form, cell, attrs[i]);
        }
        */
        this.createProperties2(form, cell);
        this.container.appendChild(form.getTable());
        //this.container.appendChild(this._table);
        mxUtils.br(this.container);
    }
};

/*
KTPropertygrid.prototype.createTextFiled = function(graph, form, cell, attribute){
    var input = this.addText(form, attribute);
    var applyHandler = function(){
        var newValue = input.value || '';
        var oldValue = cell.getAttribute(attribute.nodeName);
        if(newValue != oldValue){
            graph.getModel().beginUpdate();
            try{
                var edit = new mxCellAttributeChange(cell, attribute.nodeName, newValue);
                graph.getModel().execute(edit);
                //graph.updateCellSize(cell);
            }
            finally{
                graph.getModel().endUpdate();
            }
        }
    };

    mxEvent.addListener(input, 'keypress', function(evt){
        if(evt.keyCode == 13 && !mxEvent.isShiftDown(evt)){
            input.blur();
        }
    });

    if(mxClient.IS_IE){
        mxEvent.addListener(input, 'focusout', applyHandler);
    }
    else{
        mxEvent.addListener(input, 'blur', applyHandler);
    }
};

KTPropertygrid.prototype.addText = function(form, attribute){
    return form.addText(this.transfer(attribute.nodeName)+':', attribute.nodeValue);
};

KTPropertygrid.prototype.addElement = function(attribute){
    //return this._addField(this.transfer(attribute.nodeName), )
};
*/

KTPropertygrid.prototype.transfer = function(nodeName){
    return nodeName;
};

KTPropertygrid.prototype.createProperties = function(form, cell){
    var model = this.graph.getModel();
    var node = model.getValue(cell);
    if(mxUtils.isNode(node)){
        //var d= new mxForm();
        var texts = [];
        var attrs = node.attributes;
        for(var i=0; i<attrs.length; i++){
            texts[i] = form.addText(this.transfer(attrs[i].nodeName)+"：", attrs[i].nodeValue);
        }

        var okClick = mxUtils.bind(this, function(){
            model.beginUpdate();
            try{
                for(var c=0; c<attrs.length; c++){
                    var cellChange = new mxCellAttributeChange(cell, attrs[c].nodeName, texts[c].value);
                    model.execute(cellChange);
                }
            }
            finally{
                    model.endUpdate();
                }
        });
        var cancelClick = mxUtils.bind(this, function(){
            this.container.innerHTML ="";
            mxUtils.writeln(this.container, '未选中');
        });
        form.addButtons(okClick, cancelClick);
    }
};

KTPropertygrid.prototype.createProperties2 = function(form, cell){
    var model = this.graph.getModel();
    var node = model.getValue(cell);
    if(mxUtils.isNode(node)){
        //var d= new mxForm();
        var texts = [];
        var attrs = node.attributes;
        for(var i=0; i<attrs.length; i++){
            if(attrs[i].nodeName.toLowerCase() =="description")
            {
                texts[i] = form.addTextarea(this.transfer(attrs[i].nodeName)+"：", attrs[i].nodeValue);
            }
            else if(attrs[i].nodeName.toLowerCase() =="sn" || attrs[i].nodeName.toLowerCase() =="nodetype"){
                var element = form.addText(this.transfer(attrs[i].nodeName)+"：", attrs[i].nodeValue);
                texts[i] =element;
                element.setAttribute("readonly","true");
            }
            else if(attrs[i].nodeName.toLowerCase() =="flowsn"){
                var combo = form.addCombo(this.transfer(attrs[i].nodeName)+"：");
                texts[i] = combo;
                form.addOption(combo, "label1","11", true);
                form.addOption(combo, "label2","22", true);
            }
            else if(attrs[i].nodeName.toLowerCase() =="isauto"){
                texts[i] = form.addCheckbox(this.transfer(attrs[i].nodeName)+"：", attrs[i].nodeValue);
            }
            else if(attrs[i].nodeName.toLowerCase() =="userids" || attrs[i].nodeName.toLowerCase() =="roleids"){
                var element = form.addText(this.transfer(attrs[i].nodeName)+"：", attrs[i].nodeValue);
                texts[i] =element;
                element.setAttribute("readonly","true");
                element.ondblclick = function(){
                    var tt = new KTPropertyForm();
                    tt.show("userid");
                };
            }
            else{
                texts[i] = form.addText(this.transfer(attrs[i].nodeName)+"：", attrs[i].nodeValue);
            }
        }

        var okClick = mxUtils.bind(this, function(){
            model.beginUpdate();
            try{
                for(var c=0; c<attrs.length; c++){
                    var cellChange = new mxCellAttributeChange(cell, attrs[c].nodeName, texts[c].value);
                    model.execute(cellChange);
                }
            }
            finally{
                model.endUpdate();
            }
        });
        var cancelClick = mxUtils.bind(this, function(){
            this.container.innerHTML ="";
            mxUtils.writeln(this.container, '未选中');
        });
        form.addButtons(okClick, cancelClick);
    }
};

var KTForm = function(className){
    this._table = document.createElement("table");
    this._table.className = className;
    this._body = document.createElement("tbody");
    this._table.appendChild(this._body);
};

KTForm.prototype._table = null;
KTForm.prototype._tbody = null;

KTForm.prototype.getTable = function(){
    return this._table;
};

KTForm.prototype.addField = function(name, element){
    var tr = document.createElement("tr");
    //tr.className = "";
    var td = document.createElement("td");
    var text = document.createTextNode(name);
    td.appendChild(text);
    tr.appendChild(td);

    td = document.createElement("td");
    td.appendChild(element);
    tr.appendChild(td);

    this._body.appendChild(tr);
};

KTForm.prototype.addElement = function(name, value){

};
