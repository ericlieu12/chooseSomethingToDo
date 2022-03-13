using System.Threading.Tasks;
using chooseSomethingToDo.Database;
using chooseSomethingToDo.HubModels;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using chooseSomethingToDo.Controllers;
using chooseSomethingToDo.DBModels;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.WebUtilities;

using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace chooseSomethingToDo.Hubs
{
    public class LobbyHub : Hub
    {
        private readonly AppDbContext _context;
        private const string APIKey = "DmgNgR-nSMO5SlNIaoKDF-5qjTwXr7nylJfzIIJd85WfaBhshafH7LlPspz6U-CPvuR2H-yR8j2enlPitgsK2Aj6cdo2mkO0Bu3SAPywuko60py9S9D-awNEGFZyX3Yx";
        public LobbyHub(AppDbContext context)
        {
            _context = context;
        }
        public async Task JoinLobby(JoinLobbyMessage message)
        {
            
            Lobby lobby = await _context.Lobbys.Include(x => x.users).FirstAsync(m => m.UrlString == message.UrlString);
            
            await Groups.AddToGroupAsync(Context.ConnectionId, message.UrlString);
            if (lobby.isStarted)
            {
                //lobby started, so error it up
                Clients.Client(Context.ConnectionId).SendAsync("ErrorConnection");
            }
            else
            {
                User user = await _context.Users.FirstAsync(m => m.Id == message.UserId);
                user.ConnectionID = Context.ConnectionId;
                if (user.IsLeader)
                {

                }
                else
                {
                    //because they are not automatically added
                    lobby.users.Add(user);
                }

                await _context.SaveChangesAsync();
                await Clients.Group(message.UrlString).SendAsync("JoinedLobby", lobby.users);
            }
            
        }

        public async Task StartLobby(StartMessage message)
        {
            Lobby lobby = await _context.Lobbys.Include(x => x.users).Include(x => x.yelpListings).FirstAsync(m => m.UrlString == message.UrlString);

            User user = await _context.Users.FirstAsync(m => m.Id == message.UserId);
            try
            {
                if (lobby.users.Contains(user))
                {
                }
                else
                {
                    throw new Exception();
                }
            }
            catch (Exception ex)
            {
               
            }

            if (user.IsLeader && lobby.yelpListings.Count == 0)
            {
               
                try
                {
                    await Clients.Group(message.UrlString).SendAsync("StartedLobby", "not ready");
                    using (HttpClient client = new HttpClient())
                    {
                        var uri = "https://api.yelp.com/v3/businesses/search";
                        uri = QueryHelpers.AddQueryString(uri, "location", message.Address);
                        if (message.Price == 1)
                        {
                            uri = QueryHelpers.AddQueryString(uri, "price", "1");
                        }
                        if (message.Price == 2)
                        {
                            uri = QueryHelpers.AddQueryString(uri, "price", "1,2");
                        }
                        if (message.Price == 3)
                        {
                            uri = QueryHelpers.AddQueryString(uri, "price", "1,2,3");
                        }
                        if (message.Price == 4)
                        {
                            uri = QueryHelpers.AddQueryString(uri, "price", "1,2,3,4");
                        }
                       
                        uri = QueryHelpers.AddQueryString(uri, "open_now", message.Open.ToString());
                        uri = QueryHelpers.AddQueryString(uri, "categories", message.Categories);
                        uri = QueryHelpers.AddQueryString(uri, "radius", message.Distance.ToString());
                        var req = new HttpRequestMessage(HttpMethod.Get, uri);

                        req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", APIKey);
                        // This is the important part:

                        HttpResponseMessage resp = await client.SendAsync(req);

                        string jsonString = await resp.Content.ReadAsStringAsync();

                        //untyped, be careful
                        JToken yelpResponse = JsonConvert.DeserializeObject<JToken>(jsonString);


                        var businesses = yelpResponse["businesses"];
                        foreach (JObject business in businesses)
                        {
                            var location = business["location"];
                            var address = location["address"];
                            var categories = business["categories"];
                            var transactions = business["transactions"];
                            YelpListing listing = new YelpListing();

                            var categoryString = "";
                            foreach (JObject category in categories)
                            {
                                categoryString = categoryString + (string)category["title"] + ",";
                            }
                            listing.categoryTitleString = categoryString;

                            var transactionsString = "";
                            foreach (String transaction in transactions)
                            {
                                transactionsString = transactionsString + transaction + ",";
                            }
                            listing.city = (string)location["city"];
                            listing.country = (string)location["country"];
                            listing.state = (string)location["state"];
                            listing.zipCode = (string)location["zip_code"];
                            listing.addressString = (string)location["address1"];

                            listing.reviewCount = (int)business["review_count"];
                            listing.price = (string)business["price"];
                            listing.name = (string)business["name"];
                            listing.phone = (string)business["phone"];
                            listing.rating = (int)business["rating"];
                            listing.yelpID = (string)business["id"];
                            listing.yelpURL = (string)business["url"];
                            listing.alias = "";
                            listing.transactionsString = transactionsString;
                            listing.imageURL = (string)business["image_url"];
                            listing.distance = (string)business["distance"];
                            lobby.yelpListings.Add(listing);


                        }
                        try
                        {
                            lobby.isStarted = true;
                            await _context.SaveChangesAsync();
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.ToString());
                        }
                    }
                    await Clients.Group(message.UrlString).SendAsync("ReadyLobby", lobby.yelpListings);
                }
                catch
                {

                }
               
                
            }
            else
            {
               

            }

            
            
        }
        public async Task YesListing(YesMessage message)
        {
            try
            {
                Lobby lobby = await _context.Lobbys.Include(x => x.users).Include(x => x.yelpListings).ThenInclude(m => m.users).FirstAsync(m => m.UrlString == message.UrlString);

                User user = await _context.Users.FirstAsync(m => m.Id == message.UserId);
                if (lobby.users.Contains(user) || lobby.yelpListings[message.YelpListingId].users.Contains(user))
                {
                }
                else
                {
                    throw new Exception();
                }

                lobby.yelpListings[message.YelpListingId].users.Add(user);
                await _context.SaveChangesAsync();
                if (lobby.yelpListings[message.YelpListingId].users.Count == lobby.users.Count)
                {
                    await Clients.Group(message.UrlString).SendAsync("ChosenLocation", lobby.yelpListings[message.YelpListingId]);
                }
                if ((message.YelpListingId + 1) == lobby.yelpListings.Count)
                {
                    int maxCountIndex = 0;
                    int maxCount = 0;
                    int index = 0;
                    foreach(YelpListing listing in lobby.yelpListings)
                    {
                        if (listing.users.Count > maxCount)
                        {
                            maxCountIndex = index;
                            maxCount = listing.users.Count;
                        }
                        index++;
                    }
                    await Clients.Group(message.UrlString).SendAsync("ChosenLocation", lobby.yelpListings[maxCountIndex]);
                }
                
            }
            catch (Exception ex)
            {

            }
           



        }
        public override async Task OnDisconnectedAsync(Exception? ex)
        {
            // Add your own code here.
            // For example: in a chat application, mark the user as offline, 
            // delete the association between the current connection id and user name.
            User user = await _context.Users.FirstAsync(m => m.ConnectionID == Context.ConnectionId);
            Lobby lobby = await _context.Lobbys.Include(x => x.users).FirstAsync(m => m.Id == user.LobbyId);

            lobby.users.Remove(user);
            await _context.SaveChangesAsync();
            await Clients.Group(lobby.UrlString).SendAsync("JoinedLobby", lobby.users);
           
        }

        public async Task SendMessage(StartMessage message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}