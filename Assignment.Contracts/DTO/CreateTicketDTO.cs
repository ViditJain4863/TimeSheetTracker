namespace Assignment.Contracts.DTO
{
    public class CreateTicketDTO
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
