<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

public class Handler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";

        string xmlData = context.Request.Params["xml"];

        //Server.UrlDecode(xxxxxxxx)
        //HttpServerUtility.UrlDecode or HttpUtility.UrlDecode
        //Uri.UnescapeDataString(url)
        //HttpUtility.UrlDecode(url)
        
        
        xmlData = HttpUtility.UrlDecode(xmlData);
        ktGraphResolve ktGraphResolve = new global::ktGraphResolve();
        ktGraphResolve.Resolve(xmlData);
        context.Response.Write("Hello World");
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}