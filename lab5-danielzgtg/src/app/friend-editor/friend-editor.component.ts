import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NewProfile, toNewProfile} from "../models";

@Component({
  selector: 'app-friend-editor[initialValue][email][disabled]',
  templateUrl: './friend-editor.component.html',
  styleUrls: ['./friend-editor.component.scss']
})
export class FriendEditorComponent implements OnInit {
  protected profile: FormGroup;
  @Input() initialValue: Partial<NewProfile> | undefined = void 0;
  @Input() email: string = "";
  @Input() label: string = "";
  protected disableSubmit: boolean = true;
  @Input() set disabled(x: boolean) {
    this.disableSubmit = x;
    if (x) {
      this.profile.disable();
    } else {
      this.profile.enable();
    }
  }
  @Output() onSubmit: EventEmitter<NewProfile> = new EventEmitter();

  constructor(fb: FormBuilder) {
    this.profile = fb.nonNullable.group({
      first: ['', [Validators.required, Validators.maxLength(255)]],
      last: ['', [Validators.required, Validators.maxLength(255)]],
      phone: ['', [
        (control: AbstractControl) => /^\d*$/.test(control.value) ? null : {numeric: true},
        (control: AbstractControl) => !control.value.length || control.value.length === 10 ? null : {length: true},
        (control: AbstractControl) => !control.value.length || control.value[0] !== "0" ? null : {first: true},
        (control: AbstractControl) => !control.value.length || control.value[3] !== "0" ? null : {fourth: true},
      ]],
    });
  }

  ngOnInit(): void {
    if (this.initialValue) {
      this.profile.setValue(toNewProfile(this.initialValue));
    }
  }

  protected submit(): void {
    this.onSubmit.emit(this.profile.value);
  }
}
