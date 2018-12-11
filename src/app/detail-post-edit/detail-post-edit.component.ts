import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../../post.service';
import { Post } from '../mock/post';

@Component({
  selector: 'app-detail-post-edit',
  templateUrl: './detail-post-edit.component.html',
  styleUrls: ['./detail-post-edit.component.css']
})
export class DetailPostEditComponent implements OnInit {

  post: Post;
  postAuthor: String;
  postPicture: String;

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private location: Location) { }

  ngOnInit() {
     this.getPost();
  }

  getPost(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id).subscribe(post => this.post = post);
  }

  modifyPost(title: String, body: String, media: String): void {
    const id = +this.route.snapshot.paramMap.get('id');

    title = title.trim();
    body = body.trim();
    media = media.trim();

    if(!title || !body){return;}

    this.postService.modifyPost({title, body, media } as Post, id)
    .subscribe(post => this.post = post);
    this.location.back();

  }

  goBack(): void{
    this.location.back();
  }

}
