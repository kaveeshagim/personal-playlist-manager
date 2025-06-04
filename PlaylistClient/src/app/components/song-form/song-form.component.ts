import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SongService, Song } from '../../services/song.service';

@Component({
  selector: 'app-song-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './song-form.component.html',
  styleUrl: './song-form.component.css',
})
export class SongFormComponent {
  @Input() playlistId!: number;
  @Output() songAdded = new EventEmitter<Song>();

  newSong: Partial<Song> = {};

  constructor(private songService: SongService) {}

  addSong(): void {
    if (!this.newSong.title || !this.newSong.artist) return;

    this.songService.addSong(this.playlistId, this.newSong).subscribe({
      next: (song) => {
        this.songAdded.emit(song);
        this.newSong = {};
      },
      error: (err) => console.error('Failed to add song', err),
    });
  }
}
