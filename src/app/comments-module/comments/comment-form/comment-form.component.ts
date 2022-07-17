import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../user-login.enum';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  userLogin = UserLogin;
  @Input() img: string | null = null;
  @Input() submitLabel: string;
  @Input() hasCancelButton: boolean = false;
  @Input() initialText: string = '';

  @Output() handleSubmit = new EventEmitter<string>();
  @Output() handleCancel = new EventEmitter<void>();

  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.initialText, Validators.required],
    });
  }

  onSubmit() {
    this.handleSubmit.emit(this.form.value.title);
  }
}
