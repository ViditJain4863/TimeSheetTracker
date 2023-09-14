namespace Assignment.Contracts.DTO
{
    public class ProjectDTO
    {
        public int Id { get; set; }
        public string ProjectCode { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDescription {get; set;}
        public string ProjectStart {get; set; }
        public string ProjectEnd { get; set; }
        public string UserName { get; set;}
    }
}