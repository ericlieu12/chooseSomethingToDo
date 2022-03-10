using System.ComponentModel.DataAnnotations;

namespace chooseSomethingToDo.DBModels
{
    public class YelpListing
    {
        [Key]
        public int Id { get; set; }
        public int rating { get; set; }

        public string price { get; set; }

        public string phone { get; set; }
        public string yelpID { get; set; }
        public string alias { get; set; }

        public string categoryTitleString { get; set; }
        public int reviewCount { get; set; }

        public string yelpURL { get; set; }

        public string name { get; set; }

        public string imageURL { get; set; }
        public string addressString { get; set; }

        public string state { get; set; }

        public string city { get; set; }
        public string zipCode { get; set; }
        public string country { get; set; }

        public string distance { get; set; }

        public string transactionsString { get; set; }

        public virtual List<User> users { get; set; }

    }
}
