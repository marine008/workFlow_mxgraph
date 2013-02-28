using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

/// <summary>
///ktGraphXmlObj 的摘要说明
/// </summary>
[Serializable]
public class ktGraphXmlRoot
{
    public ktGraphXmlRoot()
    {
        FlowNodes = new List<ktGraphXmlUserNode>();
        FlowTransaction = new List<ktGraphXmlUserEdge>();
    }

    public List<ktGraphXmlUserNode> FlowNodes;

    public List<ktGraphXmlUserEdge> FlowTransaction;
}

[Serializable]
public class ktGraphXmlUserNode
{
    [XmlAttribute]
    public string sn;
    [XmlAttribute]
    public string name;
    [XmlAttribute]
    public string flowsn;
    [XmlAttribute]
    public string nodetype;
    [XmlAttribute]
    public string nodeovertime;
    [XmlAttribute]
    public string description;
    [XmlAttribute]
    public string userids;
    [XmlAttribute]
    public string roleids;
    [XmlAttribute]
    public string isauto;
    [XmlAttribute]
    public string application;
    [XmlAttribute]
    public string extraproperty;
    [XmlAttribute]
    public string remark;
}

[Serializable]
public class ktGraphXmlUserEdge
{
    [XmlAttribute]
    public string sn;
    [XmlAttribute]
    public string name;
    [XmlAttribute]
    public string flowsn;
    [XmlAttribute]
    public string description;
    [XmlAttribute]
    public string extraproperty;
    [XmlAttribute]
    public string value;
}