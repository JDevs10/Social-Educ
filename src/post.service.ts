import { Injectable } from '@angular/core';
import { Post } from './app/mock/post';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private url = 'http://localhost/Social/web/index.php';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    /*convertir cette methode pour utiller HttpClient
    return of(POSTS);*/
    return this.http.get<Post[]>(this.url+"/api/blog", {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  getPost(id: Number): Observable<Post>{
    return this.http.get<Post>(this.url+"/api/post/detail/"+id, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  addPost(post: Post): Observable<Post> {
    let body = `title=${post.title}&author=${post.author}&body=${post.body}&picture=${post.picture}&media=${post.media}`;

    return this.http.post<Post>(this.url+"/api/post", body, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
}
