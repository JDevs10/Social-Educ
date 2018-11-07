import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../app/mock/post';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  
  //posts = POSTS;
  posts: Post[];
  //selectedPost: Post;

  constructor(private postService: PostService) {}

  getPost(): void {
    this.postService.getPost().subscribe(posts => this.posts = posts);
  }

  ngOnInit() {
    this.getPost();
  }

  addPost(title: String, author: String, body: String, picture: String, media: String): void{ 
    title = title.trim();
    author = author.trim();
    body = body.trim();
    picture = picture.trim();
    media = media.trim();

    if(!title){return;}
    this.postService.addPost({ title, author, body, picture, media } as Post)
    .subscribe(post => {this.posts.push(post);});
  }

}