import { Injectable } from '@angular/core';
import { Post } from './app/mock/post';
import { POSTS } from './app/mock/mock-post';
import { Observable, of } from 'rxjs';
// import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  getPost(): Observable<Post[]> {
    return of(POSTS);
  }
}
