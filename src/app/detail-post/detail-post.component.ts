import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../../post.service';
import { Post } from '../mock/post';
import { CommentService } from '../../comment.service';
import { Comment } from '../mock/comments';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {

  post: Post;
  comments: Comment[];
  //nbComments: Number;

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private location: Location) {}

  ngOnInit() {
    this.getPost();
    this.getPostComments();
    this.getPostTotalNumberComments();
  }

  getPost(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id).subscribe(post => this.post = post);
  }

  getPostComments(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentService.getPostComments(id).subscribe(comments => this.comments = comments);
  }

  getPostTotalNumberComments(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentService.getPostTotalNumberComments(id).subscribe(post => this.post = post);
    //this.commentService.getPostTotalNumberComments(id).subscribe(nbComments => {this.nbComments = nbComments.nbComments});
  }

  postDelete(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.postDelete(id).subscribe(post => this.post = post);
    this.location.back();
    // this.route.navigate(['/foo-content', 'bar-contents', 'baz-content', 'page'], this.params.queryParams);
  }

  addLike(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentService.addLike(id).subscribe(post => this.post = post);
  }

  addComment(idPost: any, userName: String, userPicture: String, comment: String): void{
    const id = +this.route.snapshot.paramMap.get('id');
    idPost = id;
    userName = userName.trim();
    userPicture = userPicture.trim();
    comment = comment.trim();

    if(!comment){return;}
    this.commentService.addComment({ idPost, userName, userPicture, comment } as Comment, id)
    .subscribe(comments => {this.comments = comments;});
  }

  deleteComment(idComment: Number): void{
    this.commentService.deleteComment(idComment).subscribe(comments => {comments = comments;});
  }

  goBack(): void {
    this.location.back();
  }
}
