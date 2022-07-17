import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActiveCommentInterface } from '../active-comment-interface';
import { ActiveCommentType } from '../active-comment-type.enum';
import { CommentsInerface } from '../comments-inerface';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  activeCommentType = ActiveCommentType;
  replyId: string | null = null;

  @Input() replies: CommentsInerface[];
  @Input() userId: string;
  @Input() comment: CommentsInerface;
  @Input() activeComment: ActiveCommentInterface | null;
  @Input() parentId: string | null = null;
  @Output() setActiveComment =
    new EventEmitter<ActiveCommentInterface | null>();

  @Output() addComment = new EventEmitter<{
    text: string;
    parentId: string | null;
  }>();

  @Output() updateComment = new EventEmitter<{
    text: string;
    commentId: string;
  }>();

  @Output() deleteComment = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    const fiveMinutes = 300000;
    const timePassed =
      new Date().getMilliseconds() -
        new Date(this.comment.createdAt).getMilliseconds() >
      fiveMinutes;
    this.canReply = Boolean(this.userId);
    this.canEdit = this.userId === this.comment.userId && !timePassed;
    this.canDelete =
      this.userId === this.comment.userId &&
      !timePassed &&
      this.replies.length === 0;
    this.replyId = this.parentId ? this.parentId : this.comment.id;
  }
  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === this.activeCommentType.replying
    );
  }

  isEditing(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === this.activeCommentType.editing
    );
  }
}
