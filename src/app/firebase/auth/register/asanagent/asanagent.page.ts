import { Component, OnInit,  NgZone } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MenuController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordValidator } from 'src/app/validators/password.validator';
import { UsernameValidator } from 'src/app/validators/username.validators';

@Component({
  selector: 'app-asanagent',
  templateUrl: './asanagent.page.html',
  styleUrls: ['./asanagent.page.scss'],
})
export class AsanagentPage implements OnInit {
  signupForm: FormGroup;
  matching_passwords_group: FormGroup;
  submitError: string;
  redirectLoader: HTMLIonLoadingElement;

  validation_messages = {

    'name': [
      { type: 'required', message: 'Name is required.' }
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'pattern', message: 'Enter a valid phone number.' }
    ],

    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areNotEqual', message: 'Password mismatch' }
    ]
  };


  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public menu: MenuController,
    public loadingController: LoadingController,
  ) { 
 
    
     this.matching_passwords_group = new FormGroup({
      'password': new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      'confirm_password': new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areNotEqual(formGroup);
    });

    this.signupForm = new FormGroup({

      'name': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.compose ([
        Validators.required,
        Validators.pattern('^((\\+94-?)|0)?[0-9]{10}$')
      ])),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'matching_passwords': this.matching_passwords_group
    });

  }

  ngOnInit() {
  }

}
