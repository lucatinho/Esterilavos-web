import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-equipamento-delete',
  templateUrl: './dialog-equipamento-delete.component.html',
  styleUrls: ['./dialog-equipamento-delete.component.css']
})
export class DialogEquipamentoDeleteComponent implements OnInit {
  data: any = {}

  constructor(
    public dialogRef: MatDialogRef<DialogEquipamentoDeleteComponent>,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
