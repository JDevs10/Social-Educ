import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { POSTS } from '../app/mock/mock-post';
import { Post } from '../app/mock/post';
import { post } from 'selenium-webdriver/http';

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

  addPost(title: string, autor: string, body: string): void{
    title = title.trim();
    autor = autor.trim();
    body = body.trim();
    

    if(title != "" || body || autor){/*
      this.postService.addPost({title, autor,body} as Post).subscribe(posts => this.posts = posts);

      body : Post
      body = body.trim();
      this.postService.addPost(title, autor,body).subscribe(posts => this.posts = posts);
      */
    }
  }

}