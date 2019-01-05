import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../../post.service';
import { Post } from '../mock/post';
import { CommentService } from '../../comment.service';
import { Comment } from '../mock/comments';


@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {

  post: Post;
  comments: Comment[];
  checkViewEdit = false;
  id_Comment: Number;

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    public router: Router,
    private location: Location) {}

  ngOnInit() {
    this.getPost();
    if (!this.checkViewEdit) {
      this.getPostComments();
    }
    
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
    this.router.navigate(['wall']);
  }

  addPostLike(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentService.addPostLike(id).subscribe(post => this.post = post);
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

  addCommentLike(idComment: Number): void{
    this.commentService.addCommentLike(idComment).subscribe(comments => this.comments = comments);
  }

  openEditComment(idComment: Number): void {
    var div_pop_up = document.getElementById("pop-up");
    var expForm = document.getElementById("myEditCommentForm");
  
    div_pop_up.style.display = "block";
    expForm.style.display = "block";

    this.checkViewEdit = true;
    this.id_Comment = idComment;
    this.viewEditComment();
  }

  viewEditComment(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentService.editComment(id, this.id_Comment).subscribe(comments => this.comments = comments);
  }

  modifyComment(comment: String): void{
    const id = +this.route.snapshot.paramMap.get('id');
    comment = (<HTMLInputElement>document.getElementById("textareaHiddenModifyCommentBody")).value;
    // comment = (document.getElementById("textareaHiddenModifyCommentBody")).value;

    if(!comment){return;}
    this.commentService.modifyEditComment({ comment } as Comment, this.id_Comment, id)
    .subscribe(comments => {this.comments = comments;});

    this.closeEditCommentForm();
  }

  closeEditCommentForm(): void{
    var div_pop_up = document.getElementById("pop-up");
    var expForm = document.getElementById("myEditCommentForm");
  
    div_pop_up.style.display = "none";
    expForm.style.display = "none";

    this.getPostComments();
  }

  deleteComment(idComment: Number): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentService.deleteComment(id, idComment).subscribe(comments => {comments = comments;});
    this.getPostComments();
  }

  goBack(): void {
    this.location.back();
  }
}
