import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AccessDataKey, Door, Person } from "../../models";
import { DoorService } from "../door.service";
import { v4 as uuid } from 'uuid';
import { DoorAccessService } from "../door-access.service";
import { PersonService } from "../../persons/person.service";

@Component({
  selector: 'app-door-details',
  templateUrl: './door-details.component.html',
  styleUrls: ['./door-details.component.css']
})
export class DoorDetailsComponent implements OnInit {

  public form!: FormGroup;
  public door: Door | undefined;
  public persons: Person[] | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private doorService: DoorService,
    private accessService: DoorAccessService,
    private personService: PersonService) {app
  }

  ngOnInit(): void {
    this.initForm();
    this.initDoorData();
    this.initPersonData();
  }

  private initDoorData(): void {
    const doorId = this.route.snapshot.paramMap.get('doorId');
    this.door = doorId ? this.doorService.getDoorById(doorId) : undefined;
    if (this.door) {
      this.door.users = this.accessService.getAccessData(this.door.id, AccessDataKey.doorId);
      this.form.setValue({
        doorName: this.door.name,
        users: this.door.users.map(user => this.personService.getById(user))
      });
    }
  }

  private initPersonData(): void {
    this.persons = this.personService.listAll();
  }

  private initForm(): void {
    this.form = this.fb.group({
      doorName: ['', Validators.required],
      users: ['']
    })
  }

  public onSubmit(): void {
    if (this.door) {
      this.doorService.updateDoor({ id: this.door.id, name: this.form.value.doorName })
      this.accessService.updateAccess(this.form.value.users, this.door.id, AccessDataKey.doorId)
      this.snackBar.open('Door has been successfully updated');
    } else {
      const id = uuid();
      this.doorService.addDoor({ id, name: this.form.value.doorName })
      this.accessService.updateAccess(this.form.value.users, id, AccessDataKey.doorId)
      this.snackBar.open('Door has been successfully added');
    }
    this.router.navigateByUrl('/doors').then();
  }

}
