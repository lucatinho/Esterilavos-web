import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-cliente-delete',
  templateUrl: './dialog-cliente-delete.component.html',
  styleUrls: ['./dialog-cliente-delete.component.css']
})
export class DialogClienteDeleteComponent implements OnInit {
  data:any= {}

  constructor(
    public dialogRef: MatDialogRef<DialogClienteDeleteComponent>,
  ) { }

  ngOnInit(): void {
  }

// fecha dialog
  onNoClick(): void {
    this.dialogRef.close();
  }

}
