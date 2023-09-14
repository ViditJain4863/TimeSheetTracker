import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../_services/alert.service';
import { TicketService } from '../../_services/ticket.service';
import { TokenResponse } from '../../_models/user';
import { AccountService } from '../../_services/account.service';


@Component({ templateUrl: 'add-ticket.component.html' })
export class AddTicketComponent implements OnInit {
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
        private ticketService: TicketService,
        private alertService:AlertService,
        private accountService: AccountService
    ) {
        this.user = this.accountService.userValue;
     }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.form = this.formBuilder.group({
            tickettitle: ['', Validators.required],
            ticketstartdate: ['', Validators.required],
            ticketenddate: ['', Validators.required]
        });

        this.title = 'Add Ticket';
        if (this.id) {
            // edit mode
            this.title = 'Edit Ticket';
            this.loading = true;
            this.ticketService.getById(this.id)
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
        console.log(this.form.value);
        this.submitting = true;
        this.ticketService.registerTicket(this.form.value)
            .subscribe({
                next: () => {
                    this.alertService.success('Ticket detail saved', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/weekly');
                },
                error: (error: any) => {
                    console.log("Inside error log");
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }
}