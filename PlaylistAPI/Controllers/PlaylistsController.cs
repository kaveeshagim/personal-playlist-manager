using Microsoft.AspNetCore.Mvc;
using PlaylistAPI.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PlaylistAPI.Data;


namespace PlaylistAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlaylistsController : ControllerBase
    {
        private readonly PlaylistContext _context;

         public PlaylistsController(PlaylistContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Playlist>>> GetAll()
        {
            return await _context.Playlists.Include(p => p.Songs).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Playlist>> GetById(int id)
        {
            var playlist = await _context.Playlists.Include(p => p.Songs)
                                                   .FirstOrDefaultAsync(p => p.Id == id);

            if (playlist == null) return NotFound();
            return playlist;
        }

        [HttpPost]
        public async Task<ActionResult<Playlist>> Create(Playlist playlist)
        {
            _context.Playlists.Add(playlist);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = playlist.Id }, playlist);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var playlist = await _context.Playlists.FindAsync(id);
            if (playlist == null) return NotFound();

            _context.Playlists.Remove(playlist);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
