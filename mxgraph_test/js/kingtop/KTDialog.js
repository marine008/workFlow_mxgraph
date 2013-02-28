/**
 * Created with JetBrains WebStorm.
 * User: zhd
 * Date: 12-11-26
 * Time: 下午4:47
 * To change this template use File | Settings | File Templates.
 */
function KTDialog(editorUi, elt, w, h, modal, closable, onClose)
{
    var dx = 0;

    if (mxClient.IS_IE && document.documentMode != 9)
    {
        dx = 60;
    }

    w += dx;
    h += dx;

    var left = Math.max(0, Math.round((document.body.scrollWidth - w) / 2));
    var top = Math.max(0, Math.round((Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - h) / 3));

    var div = editorUi.createDiv('geDialog');
    div.style.width = w + 'px';
    div.style.height = h + 'px';
    div.style.left = left + 'px';
    div.style.top = top + 'px';

    if (this.bg == null)
    {
        this.bg = editorUi.createDiv('background');
        this.bg.style.position = 'absolute';
        this.bg.style.background = 'white';
        this.bg.style.left = '0px';
        this.bg.style.top = '0px';
        this.bg.style.bottom = '0px';
        this.bg.style.right = '0px';
        mxUtils.setOpacity(this.bg, 80);

        if (mxClient.IS_QUIRKS)
        {
            new mxDivResizer(this.bg);
        }
    }

    if (modal)
    {
        document.body.appendChild(this.bg);
    }

    div.appendChild(elt);
    document.body.appendChild(div);

    if (closable)
    {
        var img = document.createElement('img');

        img.setAttribute('src', IMAGE_PATH + '/close.png');
        img.setAttribute('title', mxResources.get('close'));
        img.className = 'geDialogClose';
        img.style.top = (top + 14) + 'px';
        img.style.left = (left + w + 38 - dx) + 'px';

        mxEvent.addListener(img, 'click', mxUtils.bind(this, function()
        {
            editorUi.hideDialog();
        }));

        document.body.appendChild(img);
        this.dialogImg = img;
    }

    this.onDialogClose = onClose;
    this.container = div;
};

/**
 * Removes the dialog from the DOM.
 */
KTDialog.prototype.close = function()
{
    if (this.onDialogClose != null)
    {
        this.onDialogClose();
        this.onDialogClose = null;
    }

    if (this.dialogImg != null)
    {
        this.dialogImg.parentNode.removeChild(this.dialogImg);
        this.dialogImg = null;
    }

    this.container.parentNode.removeChild(this.container);
    this.bg.parentNode.removeChild(this.bg);
};

/**
 * Constructs a new open dialog.
 */
function OpenDialog()
{
    var iframe = document.createElement('iframe');
    iframe.style.backgroundColor = 'transparent';
    iframe.allowTransparency = 'true';
    iframe.style.borderStyle = 'none';
    iframe.style.borderWidth = '0px';
    iframe.style.overflow = 'hidden';
    iframe.frameBorder = '0';
    iframe.setAttribute('width', '320px');
    iframe.setAttribute('height', '190px');
    iframe.setAttribute('src', OPEN_FORM);

    this.container = iframe;
};