import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../app/mock/post';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  
  posts: Post[];

  constructor(private postService: PostService) {}

  getPosts(): void {
    this.postService.getPosts().subscribe(posts => this.posts = posts);
  }

  ngOnInit() {
    this.getPosts();
  }

  addPost(title: String, author: String, body: String, picture: String, media: String): void{ 
    title = title.trim();
    author = author.trim();
    body = body.trim();
    picture = picture.trim();
    media = media.trim();

    if(!title){return;}
    this.postService.addPost({ title, author, body, picture, media } as Post)
    .subscribe(post => {this.posts.unshift(post);});
  }
}