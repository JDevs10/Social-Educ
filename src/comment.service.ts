import { Injectable } from '@angular/core';
import { Comment } from './app/mock/comments';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = 'http://localhost/Social/web/index.php';

  constructor(private http: HttpClient) { }

   getPostComments(id: Number): Observable<Comment[]>{
    return this.http.get<Comment[]>(this.url+"/api/post/detail/"+id+"/comments", 
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
   }

   getPostTotalNumberComments(id: Number): Observable<Comment>{
    return this.http.get<Comment>(this.url+"/api/post/detail/"+id+"/numberComments", 
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
   }

   addComment(comment: Comment, id: Number): Observable<Comment>{
    let body = `idPost=${comment.idPost}&userName=${comment.userName}&userPicture=${comment.userPicture}&comment=${comment.comment}`;

    return this.http.post<Comment>(this.url+"/api/post/detail/"+id+"/addComment", body, 
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

}
