using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace chooseSomethingToDo.Controllers
{
    [Route("googleapikeys")]
    [ApiController]
    public class APIKeys : ControllerBase
    {
        private const string GoogleAPIKey = "AIzaSyD6RoqikX4m2kogP_MpaaNu86iEsXAntIY";
        [HttpGet]
        public async Task<ActionResult<String>> GetAPIKeys()
        {
                   

            return GoogleAPIKey;
        }

    }
}
