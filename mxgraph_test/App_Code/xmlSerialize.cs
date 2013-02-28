using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Xml.Serialization;

/// <summary>
///xmlSerialize 的摘要说明
/// </summary>
public class xmlSerialize
{
	public xmlSerialize()
	{
		
	}

    public static T DeserializeXML<T>(string xmlData)
    {
        try
        {
            XmlSerializer serializer = new XmlSerializer(typeof(T));
            using (StringReader reader = new StringReader(xmlData))
            {

                return (T)serializer.Deserialize(reader);
            }
        }
        catch (Exception err)
        {
            return default(T);
        }
    }
}