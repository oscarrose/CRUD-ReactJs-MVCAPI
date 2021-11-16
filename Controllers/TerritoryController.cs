using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APITerritories.Data;
using APITerritories.Models;
using Microsoft.EntityFrameworkCore;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace APITerritories.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TerritoryController : ControllerBase
    {
        private readonly NorthwindContext _context;
        public TerritoryController(NorthwindContext context)
        {
            this._context = context;

        }

      

        //Get: the territories
        [HttpGet]
        public IActionResult GetTerritory()
        {
            var territory = (from t in _context.Territories
                               join r in _context.Regions
                               on t.RegionId equals r.RegionId
                               select new
                               {
                                   t.TerritoryId,
                                   t.TerritoryDescription,
                                   r.RegionDescription ,
                                   t.RegionId
                               }).ToList();
           
            return Ok(territory);
        }

        // GET Territory by id api/<TerritoriesController>/5
        [HttpGet("{id}")]
        public IActionResult GetTerritoryById(string id)
        {
            var product = _context.Territories.Find(id);
            if (product==null)
            {
                return NotFound();
            }
            return Ok(product);
           
        }
        //Post create a territory 
        [HttpPost]
        public IActionResult CreateTerrritory(Territory territory)
        {
            if (ModelState.IsValid)
            {
                _context.Territories.Add(territory);
                _context.SaveChanges();

                var url = Url.Action(nameof(GetTerritoryById), new { id = territory.TerritoryId});
                return Created(url, territory);
            }

            return BadRequest(ModelState);
        }

        // PUT edit a territory api/<TerritoriesController>/5
        [HttpPut("{id}")]
        public IActionResult EditTerritory(string id, Territory territory)
        {
            if (territory.TerritoryId==id)
            {
                try
                {
                    _context.Entry(territory).State = EntityState.Modified;
                    _context.SaveChanges();
                  
                }
                catch (Exception)
                {
                    throw;
                }
               
            }else if(id != territory.TerritoryId)
            {
                return BadRequest();

            }
            return NoContent();
        }

        // for DELETE the territory api/<TerritoriesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var territory = _context.Territories.Find(id);

            if (territory== null)
            {
                return BadRequest();
            }

            try
            {
                _context.Territories.Remove(territory);
                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
           
            return NoContent();
        }
    }
}
