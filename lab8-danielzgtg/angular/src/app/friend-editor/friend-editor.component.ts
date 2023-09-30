import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Friend, NewFriend, toNewFriend} from "../models";

@Component({
  selector: 'app-friend-editor',
  templateUrl: './friend-editor.component.html',
  styleUrls: ['./friend-editor.component.scss']
})
export class FriendEditorComponent implements OnInit {
  protected profile: FormGroup;
  @Input() initialValue: Partial<Friend> | undefined = void 0;
  @Output() onSubmit: EventEmitter<NewFriend> = new EventEmitter();

  constructor(fb: FormBuilder) {
    this.profile = fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [
        (control: AbstractControl) => /^\d*$/.test(control.value) ? null : {numeric: true},
        (control: AbstractControl) => !control.value.length || control.value.length === 10 ? null : {length: true},
        (control: AbstractControl) => !control.value.length || control.value[0] !== "0" ? null : {first: true},
        (control: AbstractControl) => !control.value.length || control.value[3] !== "0" ? null : {fourth: true},
      ]],
      // An empty email is not a "valid email"
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    if (this.initialValue) {
      this.profile.setValue(toNewFriend(this.initialValue));
    }
  }

  protected submit(): void {
    this.onSubmit.emit(this.profile.value);
  }
}
