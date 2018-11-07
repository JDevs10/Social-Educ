import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../../post.service';
import { Post } from '../mock/post';


@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {

  post: Post[];

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private location: Location) {}

  ngOnInit() {
    this.getPost();
  }

  getPost(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id).subscribe(post => this.post = post);
  }

  goBack(): void {
    this.location.back();
  }

}
