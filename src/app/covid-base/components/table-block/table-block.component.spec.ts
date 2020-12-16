import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBlockComponent } from './table-block.component';

describe('TableBlockComponent', () => {
  let component: TableBlockComponent;
  let fixture: ComponentFixture<TableBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
