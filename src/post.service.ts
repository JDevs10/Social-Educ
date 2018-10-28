import { Injectable } from '@angular/core';
import { Post } from './app/mock/post';
import { POSTS } from './app/mock/mock-post';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private urlGetPost = 'http://localhost/Social/web/index.php/api/blog';
  private urlAddPost = 'http://localhost/Social/web/index.php/api/post';

  constructor(private http: HttpClient) { }

  getPost(): Observable<Post[]> {
    /*convertir cette methode pour utiller HttpClient
    return of(POSTS);*/
    return this.http.get<Post[]>(this.urlGetPost, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  addPost(title, autor,body : Post): any {
    return this.http.put<Post[]>(this.urlAddPost, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
}
