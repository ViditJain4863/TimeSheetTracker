using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assignment.Contracts.Data.Entities
{
    public class Tracker : BaseEntity
    {
        public int Id { get; set; }
        public string TrackerDate { get; set; }
        public string TracketTask { get; set; }
        public string TrackerPlace {get; set;}
        public string TrackerDescription {get; set; }
        public string TrackerStatus { get; set; }
        public string UserName {get; set;}
        public string ProjectId {get;set;}
    }
}
