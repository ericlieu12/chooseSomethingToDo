using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace chooseSomethingToDo.Controllers
{
    [Route("googleapikeys")]
    [ApiController]
    public class APIKeys : ControllerBase
    {
        private const string APIKey = "AIzaSyDxR9q2tZoGDifI8rKlhzczTdOu - jB_MEs";
        [HttpGet]
        public async Task<ActionResult<String>> GetAPIKeys()
        {
                   

            return APIKey;
        }

    }
}
