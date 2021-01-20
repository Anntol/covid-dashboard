import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLikeComponent } from './dialog-like.component';

describe('DialogLikeComponent', () => {
  let component: DialogLikeComponent;
  let fixture: ComponentFixture<DialogLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogLikeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
