using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PlaylistAPI.Models {
    public class Playlist {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string? Description { get; set; }
        public List<Song> Songs { get; set; } = new List<Song>();
    }
}