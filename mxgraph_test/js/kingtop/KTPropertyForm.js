/**
 * Created with JetBrains WebStorm.
 * User: zhd
 * Date: 12-11-26
 * Time: 下午2:31
 * To change this template use File | Settings | File Templates.
 */
var KTPropertyForm = function(container){
    //this._container = container;
};

KTPropertyForm.prototype._container = null;

KTPropertyForm.prototype.show= function(target){
    var url="";
    switch (target){
        case"userid":
            url="./tempTest.html";
    };

    var content = new URLContent(url);
    var wnd = new mxWindow(target, content, 50, 50, 220, 224, true, true);
    wnd.setMaximizable(true);
    wnd.setScrollable(true);
    wnd.setResizable(true);
    wnd.setClosable(true);
    wnd.setVisible(true);
    //wnd.show();
};

function URLContent(url)
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
    iframe.setAttribute('src', url);

    return iframe;
    //this.container = iframe;
}