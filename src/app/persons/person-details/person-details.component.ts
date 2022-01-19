import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuid } from 'uuid';

import { AccessDataKey, Door, Person } from '../../models';
import { PersonService } from '../person.service';
import { DoorService } from "../../doors/door.service";
import { Subject, takeUntil } from "rxjs";
import { DoorAccessService } from "../../doors/door-access.service";

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  public personId: string | null = null;
  public doors: Door[] | undefined;
  private destroy$: Subject<void> = new Subject();

  public constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private snackBar: MatSnackBar,
    private doorService: DoorService,
    private accessService: DoorAccessService) {
    this.buildForm();
  }

  public ngOnInit(): void {
    this.personId = this.route.snapshot.paramMap.get('personId');
    this.getAllDoors()
    const person = this.personId && this.personService.getById(this.personId);
    if (person) {
      person.doors = this.accessService.getAccessData(person.id, AccessDataKey.userId);
      this.buildForm(person);
      this.personId = person.id;
    } else {
      this.personId = null;
    }
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getAllDoors(): void {
    this.doorService.doors
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.doors = res);
  }

  public onSave(): void {
    if (this.form.invalid) {
      return;
    }
    if (this.personId) {
      this.personService.patchOne(this.personId, { fullName: this.form.value.fullName });
      this.accessService.updateAccess(this.form.value.doors, this.personId, AccessDataKey.userId);
      this.snackBar.open('Person has been successfully updated');
    } else {
      const id = uuid();
      this.personService.addOne({ id, fullName: this.form.value.fullName });
      this.accessService.updateAccess(this.form.value.doors, id, AccessDataKey.userId);
      this.snackBar.open('Person has been successfully added');
    }
    this.router.navigateByUrl('/persons').then();
  }

  private buildForm(person?: Person): void {
    this.form = this.fb.group({
      fullName: [person?.fullName ?? '', Validators.required],
      doors: [person?.doors?.map(id => this.doorService.getDoorById(id))]
    })
  }
}
