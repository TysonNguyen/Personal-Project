using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comment_Method_Generator
{
    internal class Program
    {
        public string type = new string[""];
        static void Main(string[] args)
        {
            string[] saSplitted_Input = new string[100];
            string sMethod = null;

            Console.WriteLine("Paste your method:");
            sMethod = Console.ReadLine().Trim();
            ProcessInput(sMethod, ref saSplitted_Input);
            

            
            Console.ReadKey();
        }

        private static void ProcessInput(string sInput,ref string[] splitted_Input)
        {
            char[] toRemove = { '(', ')', ',', ' ' };
            splitted_Input = sInput.Split(toRemove);

            sInput = "";

            foreach (string s in splitted_Input)
            {
                if (s != "")
                sInput += " " + s;
            }
            splitted_Input = sInput.Split(toRemove);

            foreach (string s in splitted_Input)
            {
                Console.WriteLine(s);
            }
        }

        private static string OutputComment(string[] splitted_Input, string sInput)
        {
            string sComment = "//********************************************************************************************\r\n";
            sComment += "//Method:"+sInput+ "\r\n";
            sComment += "//Purpose: \r\n";
            sComment += "//Parameters: \r\n";
            for(int i = 0; i < splitted_Input.Length; i++)
            {
                
            }
            for(int i = 0; i < 2; i++)
            {
                if (splitted_Input[i] )
                break;
            }
            sComment += "//Returns:";
            sComment += "//********************************************************************************************\r\n";

            return sComment;
        }
    }
}
