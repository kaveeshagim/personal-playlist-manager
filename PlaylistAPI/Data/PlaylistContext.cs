using Microsoft.EntityFrameworkCore;
using PlaylistAPI.Models;

namespace PlaylistAPI.Data
{
    public class PlaylistContext : DbContext
    {
        public PlaylistContext(DbContextOptions<PlaylistContext> options) : base(options) {}

        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<Song> Songs { get; set; }
    }
}
