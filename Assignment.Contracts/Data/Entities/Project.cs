using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assignment.Contracts.Data.Entities
{
    public class Project : BaseEntity
    {
        public int Id { get; set; }
        public string ProjectCode { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDescription {get; set;}
        public string ProjectStart {get; set; }
        public string ProjectEnd { get; set; }
        public string UserName {get; set;}
    }
}