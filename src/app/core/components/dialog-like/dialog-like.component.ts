import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-like',
  templateUrl: './dialog-like.component.html',
  styleUrls: ['./dialog-like.component.scss']
})
export class DialogLikeComponent {

  constructor(public dialog: MatDialog) {}

  openLikeDialog(): void {
    this.dialog.open(DialogLikeContentComponent);
  }

}

@Component({
  selector: 'app-dialog-like-content',
  templateUrl: 'dialog-like-content.html',
})

export class DialogLikeContentComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogLikeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onClickLike(): any {
    const urlRecommend = 'https://docs.google.com/forms/d/e/1FAIpQLScGvcVIuXS0cYSoQBSis1maQ0sjovq4tDRVlSzqammRfHMtAw/viewform';
    window.open(urlRecommend);
    this.dialogRef.close();
  }

  onClickLater(): void {
    this.dialogRef.close();
  }
}
