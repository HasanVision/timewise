import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySecondaryEmailComponent } from './verify-secondary-email.component';

describe('VerifySecondaryEmailComponent', () => {
  let component: VerifySecondaryEmailComponent;
  let fixture: ComponentFixture<VerifySecondaryEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifySecondaryEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifySecondaryEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
