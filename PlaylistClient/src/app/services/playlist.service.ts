import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'https://localhost:5001/api/Playlists';

  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl);
  }

  addPlaylist(playlist: Partial<Playlist>): Observable<Playlist> {
    return this.http.post<Playlist>(this.apiUrl, playlist);
  }

  deletePlaylist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
