import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string },
                     public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
  }

  public ngOnInit(): void {
  }

  public onConfirm(): void {
    this.dialogRef.close(true);
  }
}
