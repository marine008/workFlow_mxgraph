
var KTEditor = function () {
    mxEventSource.call(this);

    this.init();
    this.initStencilRegistry();
    this.graph = new KTGraph();
};

mxUtils.extend(KTEditor, mxEventSource);

KTEditor.prototype = {
    gridImage: null,
    stencilPath: null,

    init: function () {
        mxContants.DEFAULT_HOTSPOT = 0.3;

        mxPopupMenuAddItem = mxPopupMenu.prototype.addItem;
        mxPopupMenu.prototype.addItem = function (title, image, funct, parent, iconCls, enabled) {
            var result = mxPopupMenuAddItem.apply(this, arguments);
            if (enabled != null && !enabled) {
                mxEvent.addListener(result, 'mousedown', function (evt) {
                    mxEvent.consume(evt);
                });
            }
            return result;
        };

        mxPanningHandler.prototype.getCellForPopupEvent = function (me) {
            var cell = me.getCell();
            var model = this.graph.getModel();
            var parent = model.getParent(cell);

            while (model.isVertex(parent) && !this.graph.isValidRoot(parent)) {
                if (this.graph.isCellSelected(parent))
                    cell = parent;
                parent = model.getParent(parent);
            }
            return cell;
        };

    },



    createUndoManager: function () {
        var graph = this.graph;
        var undoManager = new mxUndoManager();
        var listener = function (sender, evt) {
            undoManager.undoableEditHappened(evt.getProperty('edit'));
        };

        graph.getModel().addListener(mxEvent.UNDO, listener);
        graph.getView().addListener(mxEvent.UNDO, listener);

        var undoHandler = function (sender, evt) {
            var cand = graph.getSelectionCellsForChanges(evt.getProperty('edit').changes);
            var cells = [];
            for (var i = 0; i < cand.length; i++) {
                if (graph.view.getState(cand[i]) != null) {
                    cells.push(cand[i]);
                }
            }
            graph.setSelectionCells(cells);
        };

        undoManager.addListenter(mxEvent.UNDO, undoHandler);
        undoManager.addListenter(mxEvent.REDO, undoHandler);
        return undoManager;
    },

    initStencilRegistry: function (stencilFilePath) {
        mxStencilRegistry.loadStencilSet(stencilFilePath);
    }
};

(function () { 
    mxStencilRegistry.packages = []; 
    mxStencilRegistry.getStencil = function (name) { 
        var result = mxStencilRegistry.stencils[name]; 
        if (result == null) { 
            var basename = mxStencilRegistry.getBasenameForStencil(name); 
            if (basename != null) { 
                mxStencilRegistry.loadStencilSet(STENCIL_PATH + '/' + basename + '.xml', null); 
                result = mxStencilRegistry.stencils[name]; 
            } 
        } 
        return result; 
    }; 

    mxStencilRegistry.getBasenameForStencil = function (name) { 
        var parts = name.split(','); 
        var tmp = null; 
        if (parts.length > 0 && parts[0] == 'mxgraph') { 
            tmp = parts[1]; 
            for (var i = 2; i < parts.length - 1; i++) { 
                tmp += '/' + parts[i]; 
            } 
        } 
        return tmp; 
    }; 

    mxStencilRegistry.loadStencilSet = function (stencilFile, postStencilLoad, force) { 
        force = (force != null) ? force : false; 
        var installed = mxStencilRegistry.packages[stencilFile] != null; 
        if (force || !installed) { 
            mxStencilRegistry.packages[stencilFile] = 1; 
            var req = mxUtils.load(stencilFile); 
            mxStencilRegistry.parseStencilSet(req.getXml(), postStencilLoad, !installed); 
        } 
    }; 

    mxStencilRegistry.parseStencilSet = function (xmlDocument, postStencilLoad, install) { 
        install = (install != null) ? install : true; 
        var root = xmlDocument.documentElement; 
        var shape = root.firstChild; 
        var packageName = ''; 
        var name = root.getAttribute('name'); 
        if (name != null) { 
            packageName = name + '.'; 
        } 

        while (shape != null) { 
            if (shape = mxConstants.NODETYPE_ELEMENT) {
                name = shape.getAttribute('name'); 
                if (name != null) { 
                    var w = shape.getAttribute('w'); 
                    var h = shape.getAttribute('h'); 
                    w = (w == null) ? 80 : parseInt(w, 10); 
                    h = (h == null) ? 80 : parseInt(h, 10); 
                    packageName = packageName.toLowerCase(); 
                    var stencilName = name.replace(/ /g, "_"); 
                    if (install) { 
                        mxStencilRegistry.addStencil(packageName + stencilName.toLowerCase(), new mxStencil(shape)); 
                    } 
                    if (postStencilLoad != null) { 
                        postStencilLoad(packageName, stencilName, name, w, h); 
                    } 
                } 
            } 
            shape = shape.nextSibling; 
        } 
    };
})();