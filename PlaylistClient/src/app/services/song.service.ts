import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
export class SongService {
  private apiUrl = `${environment.apiUrl}/songs`;

  constructor(private http: HttpClient) {}

  addSong(playlistId: number, song: Partial<Song>): Observable<Song> {
    return this.http.post<Song>(`${this.apiUrl}/${playlistId}`, song);
  }

  deleteSong(playlistId: number, songId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${playlistId}/${songId}`);
  }
}
