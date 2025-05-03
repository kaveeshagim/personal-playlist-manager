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
    public class SongsController : ControllerBase
    {
       private readonly PlaylistContext _context;

        public SongsController(PlaylistContext context)
        {
            _context = context;
        }

        [HttpPost("{playlistId}")]
        public async Task<IActionResult> AddSong(int playlistId, Song song)
        {
            var playlist = await _context.Playlists.FindAsync(playlistId);
            if (playlist == null) return NotFound();

            song.PlaylistId = playlistId;
            _context.Songs.Add(song);
            await _context.SaveChangesAsync();

            return Ok(song);
        }

        [HttpDelete("{playlistId}/{songId}")]
        public async Task<IActionResult> DeleteSong(int playlistId, int songId)
        {
            var song = await _context.Songs.FirstOrDefaultAsync(s => s.Id == songId && s.PlaylistId == playlistId);
            if (song == null) return NotFound();

            _context.Songs.Remove(song);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
