import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../data/user";
import { environement } from "../../environements/environement";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersURL = `${environement.apiUrl}v1/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersURL);
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.usersURL}/register`, { username, password });
  }
}
