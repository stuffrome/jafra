import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReviewButtonComponent } from './delete-review-button.component';

describe('DeleteReviewButtonComponent', () => {
  let component: DeleteReviewButtonComponent;
  let fixture: ComponentFixture<DeleteReviewButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteReviewButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReviewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
