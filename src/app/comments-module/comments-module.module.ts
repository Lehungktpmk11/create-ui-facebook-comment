import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { CommentsServiceService } from './comments/comments-service.service';
import { CommentComponent } from './comments/comment/comment.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [CommentsComponent, CommentComponent, CommentFormComponent],
  exports: [CommentsComponent],
  providers: [CommentsServiceService],
})
export class CommentsModuleModule {}
