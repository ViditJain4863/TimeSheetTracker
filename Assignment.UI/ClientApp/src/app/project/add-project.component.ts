import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';
import { ProjectService } from '../_services/project.service';
import { TokenResponse } from '../_models/user';
import { AccountService } from '../_services/account.service';


@Component({ templateUrl: 'add-project.component.html' })
export class AddProjectComponent implements OnInit {
    form!: FormGroup;
    id?: number;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    user: TokenResponse | null;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private projectService: ProjectService,
        private alertService:AlertService,
        private accountService: AccountService
    ) {
        this.user = this.accountService.userValue;
     }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.form = this.formBuilder.group({
            projectcode: ['', Validators.required],
            projectname: ['', Validators.required],
            projectdescription: ['', Validators.required],
            projectstart: ['', Validators.required],
            projectend: ['', Validators.required]
        });

        this.title = 'Add Project';
        if (this.id) {
            // edit mode
            this.title = 'Edit Project';
            this.loading = true;
            this.projectService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.submitting = true;
        this.projectService.registerProject(this.form.value)
            .subscribe({
                next: () => {
                    this.alertService.success('Project detail saved', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/project');
                },
                error: (error: any) => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }
}