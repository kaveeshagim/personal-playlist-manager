import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Playlist {
  id: number;
  name: string;
  description?: string;
  songs: Song[];
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  genre?: string;
  mood?: string;
  playlistId: number;
}

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = `${environment.apiUrl}/playlists`;

  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<Playlist[]> {
    return this.http
      .get<Playlist[]>(this.apiUrl)
      .pipe(
        tap({
          next: (data) => console.log('Playlists loaded:', data),
          error: (err) => console.error('Failed to load playlists', err),
        })
      );
  }

  addPlaylist(playlist: Partial<Playlist>): Observable<Playlist> {
    return this.http.post<Playlist>(this.apiUrl, playlist);
  }

  deletePlaylist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addSong(playlistId: number, song: Partial<Song>): Observable<Song> {
    return this.http.post<Song>(
      `${this.apiUrl.replace('/playlists', '/songs')}/${playlistId}`,
      song
    );
  }
  deleteSong(playlistId: number, songId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl.replace('/playlists', '/songs')}/${playlistId}/${songId}`
    );
  }
}
