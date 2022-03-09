using System.Threading.Tasks;
using chooseSomethingToDo.Database;
using chooseSomethingToDo.HubModels;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using chooseSomethingToDo.Controllers;
using chooseSomethingToDo.Models;

namespace chooseSomethingToDo.Hubs
{
    public class LobbyHub : Hub
    {
        private readonly AppDbContext _context;

        public LobbyHub(AppDbContext context)
        {
            _context = context;
        }
        public async Task JoinLobby(JoinLobbyMessage message)
        {
            
            Lobby lobby = await _context.Lobbys.Include(x => x.users).FirstAsync(m => m.UrlString == message.UrlString);
            await Groups.AddToGroupAsync(Context.ConnectionId, message.UrlString);
            User user = await _context.Users.FirstAsync(m => m.Id == message.UserId);
            if (user.IsLeader)
            {

            }
            else
            {
                //because they are not automatically added
                lobby.users.Add(user);
            }

            await _context.SaveChangesAsync();
            await Clients.All.SendAsync("ReceiveMessage", lobby.users);
        }
        public async Task SendMessage(ConnectionMessage message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}