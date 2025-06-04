import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Playlist, Song } from '../../services/playlist.service';
import { SongFormComponent } from '../song-form/song-form.component';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    SongFormComponent,
  ],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.css',
})
export class PlaylistDetailComponent {
  @Input() playlist!: Playlist;

  constructor(private songService: SongService) {}

  deleteSong(songId: number): void {
    this.songService.deleteSong(this.playlist.id, songId).subscribe({
      next: () => {
        this.playlist.songs = this.playlist.songs.filter((s) => s.id !== songId);
      },
      error: (err) => console.error('Failed to delete song', err),
    });
  }

  onSongAdded(song: Song): void {
    this.playlist.songs.push(song);
  }
}
