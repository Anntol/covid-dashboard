import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-info-content',
  templateUrl: 'dialog-info-content.html',
  styleUrls: ['./dialog-info-content.scss'],
})
export class DialogInfoContentComponent {
  constructor(public dialog: MatDialog) {}
}
