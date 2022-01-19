import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { PersonService } from '../person.service';
import { Person } from '../../models';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  public displayedColumns: string[] = ['fullName', 'actions'];
  public persons: Person[] = [];

  public constructor(private personService: PersonService,
                     private snackBar: MatSnackBar,
                     private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.persons = this.personService.listAll();
  }

  public deletePerson(personId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {message: 'Are you sure you want to proceed?'},
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        const person = this.personService.deleteOne(personId)!;
        this.persons = this.personService.listAll();
        this.snackBar.open(`${person.fullName} has been removed`);
      }
    });
  }
}
