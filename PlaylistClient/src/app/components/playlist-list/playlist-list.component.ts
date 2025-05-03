import { Component, OnInit } from '@angular/core';
import { PlaylistService, Playlist } from '../../services/playlist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.css',
})
export class PlaylistListComponent implements OnInit {
  playlists: Playlist[] = [];
  newPlaylist = { name: '', description: '' };

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.loadPlaylists();
  }
  loadPlaylists() {
    this.playlistService.getPlaylists().subscribe({
      next: (data) => (this.playlists = data),
      error: (err) => console.error('Failed to load playlists', err),
    });
  }

  addPlaylist() {
    this.playlistService.addPlaylist(this.newPlaylist).subscribe({
      next: () => {
        this.newPlaylist = { name: '', description: '' };
        this.loadPlaylists(); // refresh list
      },
      error: (err) => console.error('Failed to add playlist', err),
    });
  }
}
