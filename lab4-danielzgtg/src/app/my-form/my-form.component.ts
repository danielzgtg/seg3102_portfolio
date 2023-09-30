import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDirectoryService} from "../user-directory.service";
import {Router} from "@angular/router";

const DEBUG = false;

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent {
  protected profile: FormGroup;

  constructor(private service: UserDirectoryService, private router: Router, fb: FormBuilder) {
    this.profile = fb.nonNullable.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      phone: ['', [
        Validators.required,
        (control: AbstractControl) => /^\d*$/.test(control.value) ? null : { numeric: true },
        (control: AbstractControl) => control.value.length === 10 || !control.value.length ? null : { length: true },
        (control: AbstractControl) => control.value[0] !== "0" ? null : { first: true },
        (control: AbstractControl) => control.value[3] !== "0" ? null : { fourth: true },
        // I assume "the first and fourth digits different to 0" doesn't mean they have to be different from each other
      ]],
      email: ['', [Validators.required, Validators.email]],
    });
    if (DEBUG) {
      this.profile.setValue({
        first: "Daniel",
        last: "Tang",
        phone: "1234567890",
        email: "dtang090@uottawa.ca",
      });
    }
  }

  protected submit(): void {
    this.service.add(this.profile.value);
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/friends']);
  }
}
