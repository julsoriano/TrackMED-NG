import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@app/_services';
import { CustomValidators } from '../custom-validators';

@Component({templateUrl: 'login.component.html'})

/* PV
@Component({ 
    templateUrl: 'login.component.pv.html', 
    styleUrls: ['./login.component.pv.css']
})
*/

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string

    // PV
    // frmSignup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        // this.frmSignup = this.createSignupForm();
    
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });    

        /*
        this.loginForm = this.formBuilder.group({
            email: [
            null,
            Validators.compose([Validators.email, Validators.required])
            ],
            password: [
            null,
            Validators.compose([
                Validators.required,
                // check whether the entered password has a number
                CustomValidators.patternValidator(/\d/, {
                hasNumber: true
                }),
                // check whether the entered password has upper case letter
                CustomValidators.patternValidator(/[A-Z]/, {
                hasCapitalCase: true
                }),
                // check whether the entered password has a lower case letter
                CustomValidators.patternValidator(/[a-z]/, {
                hasSmallCase: true
                }),
                // check whether the entered password has a special character
                CustomValidators.patternValidator(
                /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
                {
                    hasSpecialCharacters: true
                }
                ),
                Validators.minLength(8)
            ])
            ],
            confirmPassword: [null, Validators.compose([Validators.required])]
        },
        {
            // check whether our password and confirm password match
            validator: CustomValidators.passwordMatchValidator
        });
        */

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    /*
    createSignupForm(): FormGroup {
        return this.formBuilder.group(
        {
            email: [
            null,
            Validators.compose([Validators.email, Validators.required])
            ],
            password: [
            null,
            Validators.compose([
                Validators.required,
                // check whether the entered password has a number
                CustomValidators.patternValidator(/\d/, {
                hasNumber: true
                }),
                // check whether the entered password has upper case letter
                CustomValidators.patternValidator(/[A-Z]/, {
                hasCapitalCase: true
                }),
                // check whether the entered password has a lower case letter
                CustomValidators.patternValidator(/[a-z]/, {
                hasSmallCase: true
                }),
                // check whether the entered password has a special character
                CustomValidators.patternValidator(
                /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
                {
                    hasSpecialCharacters: true
                }
                ),
                Validators.minLength(8)
            ])
            ],
            confirmPassword: [null, Validators.compose([Validators.required])]
        },
        {
            // check whether our password and confirm password match
            validator: CustomValidators.passwordMatchValidator
        }
        );
    }
    */

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
