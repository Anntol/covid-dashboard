import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLikeContentComponent } from './dialog-like-content.component';

@Component({
  selector: 'app-dialog-like',
  templateUrl: './dialog-like.component.html',
  styleUrls: ['./dialog-like.component.scss'],
})
export class DialogLikeComponent {
  constructor(public dialog: MatDialog) {}

  openLikeDialog(): void {
    this.dialog.open(DialogLikeContentComponent);
  }
}
