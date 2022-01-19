import { Component, OnDestroy, OnInit } from '@angular/core';
import { Door } from "../../models";
import { DoorService } from "../door.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-door-list',
  templateUrl: './door-list.component.html',
  styleUrls: ['./door-list.component.css']
})
export class DoorListComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = ['doorName', 'actions'];
  public doors: Door[] = [];
  private destroy$: Subject<void> = new Subject();

  constructor(
    private doorService: DoorService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllDoors();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getAllDoors(): void {
    this.doorService.doors
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.doors = res);
  }

  public deleteDoor(door: Door): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to proceed?' },
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.snackBar.open(`Door '${door.name}' has been removed`);
        this.doorService.deleteDoor(door.id);
      }
    })
  }

}
