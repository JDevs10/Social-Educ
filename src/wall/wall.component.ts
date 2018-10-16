import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { POSTS } from '../app/mock/mock-post';
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
    this.postService.getPost()
        .subscribe(posts => this.posts = posts);
  }

  ngOnInit() {
    this.getPost();
  }
/*
  onSelect(post: Post): void {
    this.selectedPost = post;
  }*/

}