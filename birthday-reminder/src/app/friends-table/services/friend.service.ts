import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Friend } from '../../inferfaces/friend.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private baseUrl: string = 'http://16.16.127.251:8000/api';

  constructor(private http: HttpClient) {}

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getFriends(): Observable<Friend[]> {
    return this.http.get<Friend[]>(`${this.baseUrl}/friends`);
  }

  postFriend(friend: Friend): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/friends/`,
      friend,
      this.httpOptions
    );
  }

  deleteFriend(id: number): Observable<Friend> {
    return this.http.delete<Friend>(`${this.baseUrl}/friends/${id}/`);
  }
}
