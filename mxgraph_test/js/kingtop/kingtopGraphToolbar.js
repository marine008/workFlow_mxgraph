var kingtopGraphToolbar = function (graph, divId) {
    this.graph = graph;

    var tbContainer = document.getElementById(divId);
    this.toolbar = new mxToolbar(tbContainer);
    this.toolbar.enabled = false;
    this._initializeToolbarItem();
}

kingtopGraphToolbar.prototype = {
    graph: null,
    toolbar: null,

    AddUserVertext: function (icon, w, h, style, value) {
        var vertext = new mxCell(value, new mxGeometry(0, 0, w, h), style);
        vertext.setVertex(true);

        var img = this._addToolbarMode(this.graph, this.toolbar, vertext, icon);
        img.enabled = true;
    },

    //--------------------------
    AddVertext: function (icon, w, h, style) {
        var vertext = new mxCell(null, new mxGeometry(0, 0, w, h), style);
        vertext.setVertex(true);

        var img = this._addToolbarMode(this.graph, this.toolbar, vertext, icon);
        img.enabled = true;
    },

    //--------------------------
    _addToolbarMode: function (graph, toolbar, prototype, image) {
        var funct = function (graph, evt, cell, x, y) {
            graph.stopEditing(false);

            var vertex = graph.getModel().cloneCell(prototype);
            vertex.geometry.x = x;
            vertex.geometry.y = y;

            graph.addCell(vertex);
            graph.setSelectionCell(vertex);
        }

        var img = toolbar.addMode(null, image, function (evt, cell) {
            var pt = this.graph.getPointForEvent(evt);
            funct(graph, evt, cell, pt.x, pt.y);
        });

        mxEvent.addListener(img, 'mousedown', function (evt) {
            // do nothing
        });

        mxEvent.addListener(img, 'mousedown', function (evt) {
            if (img.enabled == false) {
                mxEvent.consume(evt);
            }
        });

        mxUtils.makeDraggable(img, graph, funct);

        return img;
    },

    //--------------------------
    _initializeToolbarItem: function () {
        var flow = this.graph;
        this.toolbar.addItem('放大', './././src/images/zoomin.gif', function (evt) { flow.zoomIn() });
        this.toolbar.addItem('缩小', './././src/images/zoomout.gif', function (evt) { flow.zoomOut() });
        this.toolbar.addItem('平移', './././src/images/pan.gif', function (evt) {
            flow.setPanning(true);
            flow.useLeftButtonForPanning = true;
        });
        this.toolbar.addItem('编辑', './././src/images/select.gif', function (evt) { flow.setPanning(false); });
        this.toolbar.addItem('', './././src/images/cmp-bg.gif', null);
    }
}