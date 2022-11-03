import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [this.validatorsService.required]],
      password: ['', [this.validatorsService.required, this.validatorsService.pattern(this.authService.pwPattern)]],
      repeatPassword: ['', [this.validatorsService.required, this.validatorsService.pattern(this.authService.pwPattern)]],
    });
  }

  onSubmitSignup() {
   this.authService.signup(''+this.signupForm.get('username')?.value, ''+this.signupForm.get('password')?.value);
  }

  passwordMismatchMessage() {
    return this.authService.passwordMismatchMessage(this.signupForm);
  }

  invalidUsernameMessage() {
    return this.authService.invalidUsernameMessage(this.signupForm);
  }

  invalidPasswordMessage() {
    return this.authService.invalidPasswordMessage(this.signupForm);
  }
}


