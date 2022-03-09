#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using chooseSomethingToDo.Database;
using chooseSomethingToDo.Models;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.SignalR;
using chooseSomethingToDo.Hubs;
using System.Text;

namespace chooseSomethingToDo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LobbiesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<LobbyHub> _hub;
        public LobbiesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Lobbies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lobby>> GetLobby(int id)
        {
            var lobby = await _context.Lobbys.FindAsync(id);

            if (lobby == null)
            {
                return NotFound();
            }

            return lobby;
        }

       
        // PUT: api/Lobbies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLobby(int id, Lobby lobby)
        {
            if (id != lobby.Id)
            {
                return BadRequest();
            }

            _context.Entry(lobby).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LobbyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        [Route("api/createLobby")]
        public async Task<ActionResult<Lobby>> CreateLobby([FromBody] String name)
        {
            try
            {
                Lobby lobby = new Lobby();
                Thread.Sleep(1);//make everything unique while looping
                long ticks = (long)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, 0))).TotalMilliseconds;//EPOCH
                char[] baseChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".ToCharArray();

                int i = 32;
                char[] buffer = new char[i];
                int targetBase = baseChars.Length;

                do
                {
                    buffer[--i] = baseChars[ticks % targetBase];
                    ticks = ticks / targetBase;
                }
                while (ticks > 0);

                char[] result = new char[32 - i];
                Array.Copy(buffer, i, result, 0, 32 - i);
                lobby.UrlString = new string(result);
                lobby.users = new List<User>();

                User user = new User();
                user.Name = name;
                user.IsLeader = true;

                lobby.users.Add(user);

                _context.Lobbys.Add(lobby);


                await _context.SaveChangesAsync();

                return CreatedAtAction("CreateLobby", lobby);
            }
            catch (Exception ex)
            {
                return NotFound();
            }
            
        }

       
        [HttpPost]
        [Route("api/joinLobby")]
        public async Task<ActionResult<Lobby>> JoinLobby()
        {
            try
            {
                Lobby lobby = new Lobby();
                lobby.UrlString = "123456";
                lobby.users = new List<User>();

                User user = new User();
                user.Name = "Test1";
                user.IsLeader = true;

                lobby.users.Add(user);
                _context.Lobbys.Add(lobby);
                await _context.SaveChangesAsync();

                return CreatedAtAction("CreateLobby", lobby);
            }
            catch (Exception ex)
            {
                return NotFound();
            }
            
        }



        
        // DELETE: api/Lobbies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLobby(int id)
        {
            var lobby = await _context.Lobbys.FindAsync(id);
            if (lobby == null)
            {
                return NotFound();
            }

            _context.Lobbys.Remove(lobby);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LobbyExists(int id)
        {
            return _context.Lobbys.Any(e => e.Id == id);
        }
    }
}
