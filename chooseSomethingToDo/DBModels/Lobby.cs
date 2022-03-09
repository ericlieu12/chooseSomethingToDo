using System.ComponentModel.DataAnnotations;

namespace chooseSomethingToDo.Models
{
    public class Lobby
    {
        [Key]
        public int Id { get; set; }
        public string UrlString { get; set; }
       
        public virtual List<User> users { get; set; }
       
    }
}
