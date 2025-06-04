import { Component, OnInit } from '@angular/core';
import { PlaylistService, Playlist } from '../../services/playlist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
  ],
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.css',
})
export class PlaylistListComponent implements OnInit {
  playlists: Playlist[] = [];
  newPlaylist = { name: '', description: '' };
  newSongs: { [playlistId: number]: any } = {};

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.loadPlaylists();
  }
  loadPlaylists() {
    this.playlistService.getPlaylists().subscribe({
      next: (data) => {
        this.playlists = data;
        for (const p of this.playlists) {
          if (!this.newSongs[p.id]) {
            this.newSongs[p.id] = {};
          }
        }
      },
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

  deletePlaylist(id: number): void {
    this.playlistService.deletePlaylist(id).subscribe({
      next: () => {
        this.playlists = this.playlists.filter((p) => p.id !== id);
      },
      error: (err) => console.error('Failed to delete playlist', err),
    });
  }

  addSongToPlaylist(playlistId: number): void {
    const song = this.newSongs[playlistId];
    if (!song?.title || !song?.artist) return;

    this.playlistService.addSong(playlistId, song).subscribe({
      next: (newSong) => {
        const playlist = this.playlists.find((p) => p.id === playlistId);
        if (playlist) {
          playlist.songs.push(newSong);
        }
        this.newSongs[playlistId] = {}; // Reset form
      },
      error: (err) => console.error('Failed to add song', err),
    });
  }
  deleteSong(playlistId: number, songId: number): void {
    this.playlistService.deleteSong(playlistId, songId).subscribe({
      next: () => {
        const playlist = this.playlists.find((p) => p.id === playlistId);
        if (playlist) {
          playlist.songs = playlist.songs.filter((s) => s.id !== songId);
        }
      },
      error: (err) => console.error('Failed to delete song', err),
    });
  }
}
