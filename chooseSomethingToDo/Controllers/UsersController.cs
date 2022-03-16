#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using chooseSomethingToDo.Database;
using chooseSomethingToDo.DBModels;

namespace chooseSomethingToDo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

      

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

      
        [HttpPost]
        [Route("createUser")]
        public async Task<ActionResult<User>> CreateUser([FromBody] string name)
        {

            try
            {
                User user = new User();
                user.Name = name;
                user.IsLeader = false;
                

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return CreatedAtAction("CreateLobby", user);
            }
            catch (Exception ex)
            {
                return NotFound();
            }
           

            
        }
       

       
    }
}
