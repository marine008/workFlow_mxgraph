using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using System.Xml.Linq;

using System.IO;
using System.Xml.Serialization;

/// <summary>
///ktGraphResolve 的摘要说明
/// </summary>
public class ktGraphResolve
{
    public ktGraphResolve()
    {

    }

    public bool Resolve(string xmlData)
    {
        bool success = false;

        XmlDataDocument xmlDataDocument = new XmlDataDocument();
        xmlDataDocument.LoadXml(xmlData);

        XmlNode xNode = xmlDataDocument.SelectSingleNode("mxGraphModel");
        XmlNodeList xNodeList = xNode.ChildNodes;

        foreach (XmlNode cNode in xNodeList)
        {
            if (cNode.Name == "root")
            {
                ktGraphXmlRoot root = new ktGraphXmlRoot();
                XmlNodeList xRootNodeList = cNode.ChildNodes;
                foreach (XmlNode mNode in xRootNodeList)
                {
                    if (mNode.Name == "UserNode")
                    {
                        ktGraphXmlUserNode node = new ktGraphXmlUserNode();
                        node.sn = mNode.Attributes["sn"].Value;
                        node.name = mNode.Attributes["name"].Value;
                        node.flowsn = mNode.Attributes["flowsn"].Value;
                        node.nodetype = mNode.Attributes["nodetype"].Value;
                        node.nodeovertime = mNode.Attributes["nodeovertime"].Value;
                        node.description = mNode.Attributes["description"].Value;
                        node.userids = mNode.Attributes["userids"].Value;
                        node.roleids = mNode.Attributes["roleids"].Value;
                        node.isauto = mNode.Attributes["isauto"].Value;
                        node.application = mNode.Attributes["application"].Value;
                        node.extraproperty = mNode.Attributes["extraproperty"].Value;
                        node.remark = mNode.Attributes["remark"].Value;

                        root.FlowNodes.Add(node);
                    }
                    else if (mNode.Name == "UserEdge")
                    {
                        ktGraphXmlUserEdge edge = new ktGraphXmlUserEdge();
                        edge.sn = mNode.Attributes["sn"].Value;
                        edge.name = mNode.Attributes["name"].Value;
                        edge.flowsn = mNode.Attributes["flowsn"].Value;
                        edge.description = mNode.Attributes["description"].Value;
                        edge.extraproperty = mNode.Attributes["extraproperty"].Value;
                        edge.value = mNode.Attributes["value"].Value;

                        root.FlowTransaction.Add(edge);
                    }
                }
            }
        }

        return success;
    }

    public bool Resolve2(string xmlData)
    {
        bool success = false;

        XDocument xDoc = XDocument.Load(xmlData);
        IEnumerable<XElement> elements = xDoc.Elements("root");
        foreach (XElement ele in elements)
        {
            if (ele.Name == "beginNode")
            { }
            else if (ele.Name == "TaskNode")
            { }
            else if (ele.Name == "EndNode")
            { }
        }

        return success;
    }
}