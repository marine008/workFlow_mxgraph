<%@ WebHandler Language="C#" Class="datagridData" %>

using System;
using System.Web;

public class datagridData : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";

        int row = int.Parse(context.Request["rows"].ToString());
        int page = int.Parse(context.Request["page"].ToString());

        string value = "{\"total\":10,\"rows\":[" +
            "{\"Name\":\"1\",\"Guid\":\"123\",\"CreateUser\":\"一\",\"CreateTime\":\"一\"}," +
            "{\"Name\":\"1\",\"Guid\":\"123\",\"CreateUser\":\"一\",\"CreateTime\":\"一\"}," +
            "{\"Name\":\"1\",\"Guid\":\"123\",\"CreateUser\":\"一\",\"CreateTime\":\"一\"}," +
            "{\"Name\":\"1\",\"Guid\":\"123\",\"CreateUser\":\"一\",\"CreateTime\":\"一\"}," +
            "{\"Name\":\"1\",\"Guid\":\"123\",\"CreateUser\":\"一\",\"CreateTime\":\"一\"}," +
            "{\"Name\":\"1\",\"Guid\":\"123\",\"CreateUser\":\"一\",\"CreateTime\":\"一\"}," +
            "{\"Name\":\"1\",\"Guid\":\"123\",\"CreateUser\":\"一\",\"CreateTime\":\"一\"}," +
            "{\"Name\":\"1\",\"Guid\":\"123\",\"CreateUser\":\"一\",\"CreateTime\":\"一\"}," +
            "{\"Name\":\"1\",\"Guid\":\"123\",\"CreateUser\":\"一\",\"CreateTime\":\"一\"}," +
            "{\"Name\":\"1\",\"Guid\":\"123\",\"CreateUser\":\"一\",\"CreateTime\":\"一\"}" +
            "]}";
        context.Response.Write(value);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}