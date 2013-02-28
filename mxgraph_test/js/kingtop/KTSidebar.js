var KTSidebar = function (container, graph) {
    this._container = container;
    this.graph = graph;
};

KTSidebar.prototype.graph =  null;
KTSidebar.prototype._container = null;
KTSidebar.prototype.shiftThumbs = mxClient.IS_SVG || document.documentMode == 8;
KTSidebar.prototype.thumbBorder =2;
KTSidebar.prototype.thumbWidth = 120;
KTSidebar.prototype.thumbHeight = 60;

KTSidebar.prototype.createVertex = function(style, width, height, value){
    var elt = this.createVertexTemplate(style, width, height, value);
    this._container.appendChild(elt);
};

KTSidebar.prototype.createVertexTemplate = function(style, width, height, value){
    var cells =[new mxCell((value != null)? value: '', new mxGeometry(0,0,width,height), style)];
    cells[0].vertex = true;
    return this.createVertexTemplateFromCells(cells, width, height);
};

KTSidebar.prototype.createVertexTemplateFromCells = function(cells, width, height){
    var elt = this.createItem(cells);
    var ds = this.createDragSource(elt, this.createDropHandler(cells, true), this.createDragPreview(width, height));
    this.addClickHandler(elt, ds);

    ds.isGuidesEnabled = mxUtils.bind(this, function(){
        return this.graph.graphHandler.guidesEnabled;
    });

    /*if(!touchStyle){
        mxEvent.addListener(elt, 'mousemove', mxUtils.bind(this, function(evt){
            this.showTooltip(elt, cells);
        }));
    }*/
    return elt;
};

KTSidebar.prototype.createItem = function(cells){
    var elt = document.createElement('a');
    elt.setAttribute('href', 'javascript:void(0);');
    elt.className = 'ktItem';

    mxEvent.addListener(elt, 'click', function(evt){
        mxEvent.consume(evt);
    });

    this.createThumb(cells, this.thumbWidth, this.thumbHeight, elt);
    return elt;
};

KTSidebar.prototype.createThumb = function(cells, width, height, parent){
    var old = mxText.prototype.getTableSize;

    if(this.graph.dialect != mxConstants.DIALECT_SVG){
        mxText.prototype.getTableSize = function(table){
            var oldParent = table.parentNode;
            document.body.appendChild(table);
            var size = new mxRectangle(0,0,table.offsetWidth, table.offsetHeight);
            oldParent.appendChild(table);
            return size;
        };
    }

    var prev = mxImageShape.prototype.preserveImageAspect;
    mxImageShape.prototype.preserveImageAspect = false;

    this.graph.view.rendering = false;
    this.graph.view.setScale(1);
    this.graph.addCells(cells);
    var bounds = this.graph.getGraphBounds();

    var corr = (this.shiftThumbs)?this.thumbBorder+1:this.thumbBorder;
    var s = Math.min((width-1)/(bounds.x+bounds.width+corr), (height-1)/(bounds.y+bounds.height +corr));
    this.graph.view.setScale(s);
    this.graph.view.rendering = true;
    this.graph.refresh();
    mxImageShape.prototype.preserveImageAspect = prev;

    bounds = this.graph.getGraphBounds();
    var dx = Math.max(0, Math.floor((width - bounds.width)/2));
    var dy = Math.max(0, Math.floor((height - bounds.height)/2));

    var node = null;
    if(this.graph.dialect == mxConstants.DIALECT_SVG && !mxClient.IS_IE){
        node = this.graph.view.getCanvas().ownerSVGElement.cloneNode(true);
    }
    else if(document.documentMode == 8){
        node = this.graph.container.cloneNode(false);
        node.innerHTML = this.graph.container.innerHTML;
    }
    else{
        node =  this.graph.container.cloneNode(true);
    }

    this.graph.getModel().clear();

    //设置样式
    var dd = (this.shiftThumbs)?2:3;
    node.style.position = 'relative';
    node.style.overflow = 'visible';
    node.style.cursor = 'pointer';
    node.style.left  = (dx+dd)+'px';
    node.style.top = (dy+dd)+'px';
    node.style.width = width+'px';
    node.style.height = height+'px';

    parent.appendChild(node);
    mxText.prototype.getTableSize = old;
};

KTSidebar.prototype.addClickHandler = function(elt, ds){
    var graph = this.graph;
    var first = null;
    var md = (mxClient.IS_TOUCH)?'touchstart':'mousedown';
    mxEvent.addListener(elt, md, function(evt){
        first = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
    });

    var oldMouseUp = ds.mouseUp;
    ds.mouseUp = function(evt){
        if(!mxEvent.isPopupTrigger(evt) && this.currentGraph == null && first != null){
            var tol = graph.tolerance;
            if(Math.abs(first.x - mxEvent.getClientX(evt)) <= tol && Math.abs(first.y - mxEvent.getClientY(evt) <=tol)){
                var gs = graph.getGridSize();
                ds.drop(graph, evt, null, gs, gs);
            }
        }
        oldMouseUp.apply(this, arguments);
        first = null;
    };
};
//创建可以拖拽的对象
KTSidebar.prototype.createDragSource = function(elt, dropHandler, preview){
    var dragSource = mxUtils.makeDraggable(elt, this.graph, dropHandler, preview, 0, 0, this.graph.autoscroll, true, true);

    dragSource. getDropTarget = function(graph, x, y){
        var target = mxDragSource.prototype.getDropTarget.apply(this, arguments);
        if(!this.graph.isValidRoot(target)){
            target = null;
        }
        return target;
    };
    return dragSource;
};

KTSidebar.prototype.createDropHandler = function(cells, allowSplit){
    return function(graph, evt, target, x, y){
        cells = graph.getImportableCells(cells);
        if(cells.length > 0){
            var validDropTarget = (target != null)?graph.isValidDropTarget(target, cells, evt):false;
            var select = null;
            if(target != null && !validDropTarget){
                target = null;
            }

            if(allowSplit && graph.isSplitEnabled() && graph.isSplitTarget(target, cells, evt)){
                graph.splitEdge(target, cells, null, x, y);
                select = cells;
            }
            else if(cells.length >0){
                select = graph.importCells(cells, x, y, target);
            }

            if(select != null && select.length > 0){
                graph.scrollCellToVisible(select[0]);
                graph.setSelectionCells(select);
            }
        }
    };
};

KTSidebar.prototype.createDragPreview = function(width, height){
    var elt = document.createElement('div');
    elt.style.border = '1px dashed black';
    elt.style.width = width+'px';
    elt.style.height = height+'px';
    return elt;
};
