import { Injectable } from '@angular/core';
import { Post } from './app/mock/post';
import { Observable, of, from } from 'rxjs';
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

  addPost(post: Post): Observable<Post> {
    let body = `title=${post.title}&body=${post.body}&author=${post.author}&picture=${post.picture}&media${post.media}`;
    let bodyll = `title=${post.title}&author=${post.author}&body=${post.body}&picture=${post.picture}&media=${post.media}`;

    console.log("body: "+body+"\nbodyll: "+bodyll);
    
    return this.http.post<Post>(this.urlAddPost, bodyll, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
}
