import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuid } from 'uuid';

import { Person } from '../models';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  public form!: FormGroup;
  public personId: string | null = null;

  public constructor(private fb: FormBuilder,
                     private route: ActivatedRoute,
                     private router: Router,
                     private personService: PersonService,
                     private snackBar: MatSnackBar) {
    this.buildForm();
  }

  public ngOnInit(): void {
    this.personId = this.route.snapshot.paramMap.get('personId');
    const person = this.personId && this.personService.getById(this.personId);
    if (person) {
      this.buildForm(person);
      this.personId = person.id;
    } else {
      this.personId = null;
    }
  }

  public onSave(): void {
    if (this.form.invalid) {
      return;
    }
    if (this.personId) {
      this.personService.patchOne(this.personId, {fullName: this.form.value.fullName});
      this.snackBar.open('Person has been successfully updated');
    } else {
      this.personService.addOne({id: uuid(), fullName: this.form.value.fullName});
      this.snackBar.open('Person has been successfully added');
    }
    this.router.navigateByUrl('/persons').then();
  }

  private buildForm(person?: Person): void {
    this.form = this.fb.group({
      fullName: [person?.fullName ?? '', Validators.required]
    })
  }
}
