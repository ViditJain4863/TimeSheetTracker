using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assignment.Contracts.Data.Entities
{
    public class Ticket : BaseEntity
    {
        public int Id { get; set; }
        public string TicketCreationDate { get; set; }
        public string TicketStartDate { get; set; }
        public string TicketEndDate {get; set;}
        public string TicketTitle {get; set; }
        public string UserName {get; set;}
        public int ProjectId {get;set;}
    }
}
