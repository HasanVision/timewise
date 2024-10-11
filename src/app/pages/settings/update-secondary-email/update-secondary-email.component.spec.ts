import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSecondaryEmailComponent } from './update-secondary-email.component';

describe('UpdateSecondaryEmailComponent', () => {
  let component: UpdateSecondaryEmailComponent;
  let fixture: ComponentFixture<UpdateSecondaryEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSecondaryEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSecondaryEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
