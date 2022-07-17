import { Component, Input, OnInit } from '@angular/core';
import { ActiveCommentInterface } from './active-comment-interface';
import { CommentsInerface } from './comments-inerface';
import { CommentsServiceService } from './comments-service.service';
import { UserLogin } from './user-login.enum';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() userId: string;
  comments: CommentsInerface[] = [];
  commentsNotChild: CommentsInerface[] = [];
  activeComment: ActiveCommentInterface | null = null;
  userLogin = UserLogin;

  constructor(private commentsService: CommentsServiceService) {}

  ngOnInit() {
    this.comments = this.commentsService.getListComments();
    this.updateListComment(this.comments);
  }

  addComment({ text, parentId }: { text: string; parentId: null | string }) {
    this.comments = this.commentsService.createComment(text, parentId);
    this.updateListComment(this.comments);
    this.activeComment = null;
    console.log(this.comments);
  }
  updateComment({ text, commentId }: { text: string; commentId: string }) {
    this.comments = this.commentsService.updateComment(commentId, text);
    this.updateListComment(this.comments);
    this.activeComment = null;
  }

  deleteComment(commentId: string) {
    console.log('delete');
    this.comments = this.commentsService.deleteComment(commentId);
    this.updateListComment(this.comments);
  }

  getReplies(commnetId: string): CommentsInerface[] {
    return this.comments
      .filter((comment) => comment.parentId === commnetId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getMilliseconds() -
          new Date(b.createdAt).getMilliseconds()
      );
  }
  updateListComment(comments) {
    this.commentsNotChild = comments.filter(
      (comment) => comment.parentId === null
    );
  }
  setActiveComment(activeComment: ActiveCommentInterface): void {
    this.activeComment = activeComment;
  }
}
