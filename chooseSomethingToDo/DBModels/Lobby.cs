
using System.ComponentModel.DataAnnotations;

namespace chooseSomethingToDo.DBModels
{
    public class Lobby
    {
        [Key]
        public int Id { get; set; }
        public string UrlString { get; set; }

        public bool isStarted { get; set; }
       
        public virtual List<User> users { get; set; }

        public virtual List<YelpListing> yelpListings { get; set; }
    }
}
