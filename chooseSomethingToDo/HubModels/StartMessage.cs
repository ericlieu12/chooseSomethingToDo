namespace chooseSomethingToDo.HubModels
{
    public class StartMessage
    {
        public int UserId { get; set; }
        public string UrlString { get; set; }

        public string Address { get; set; }
       
        public int Distance { get; set; }
        public string Categories { get; set; }
        public int Price { get; set; }
        public bool Open { get; set; }
    } 
}
