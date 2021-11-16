using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APITerritories.Data;
using APITerritories.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace APITerritories.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionController : ControllerBase
    {
        private readonly NorthwindContext _context;
        public RegionController(NorthwindContext context)
        {
            this._context = context;

        }

        //For get the region GET: api/<RegionController>
        [HttpGet]
        public IActionResult GetRegion()
        {
            var region = _context.Regions.ToList();
            return Ok(region);
        }

        // GET api/<RegionController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<RegionController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<RegionController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<RegionController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
