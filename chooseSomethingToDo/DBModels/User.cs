﻿using System.ComponentModel.DataAnnotations;

namespace chooseSomethingToDo.DBModels
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public bool IsLeader { get; set; }
       
    }
}
