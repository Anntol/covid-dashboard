import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-like-content',
  templateUrl: 'dialog-like-content.html',
})
export class DialogLikeContentComponent {
  constructor(public dialogRef: MatDialogRef<DialogLikeContentComponent>) {}

  onClickLike(): void {
    const urlRecommend = 'https://docs.google.com/forms/d/e/1FAIpQLScGvcVIuXS0cYSoQBSis1maQ0sjovq4tDRVlSzqammRfHMtAw/viewform';
    window.open(urlRecommend);
    this.dialogRef.close();
  }

  onClickLater(): void {
    this.dialogRef.close();
  }
}
