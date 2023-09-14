namespace Assignment.Contracts.DTO
{
    public class CreateTrackerDTO
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