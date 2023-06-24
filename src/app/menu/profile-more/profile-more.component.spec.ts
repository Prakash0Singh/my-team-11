import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMoreComponent } from './profile-more.component';

describe('ProfileMoreComponent', () => {
  let component: ProfileMoreComponent;
  let fixture: ComponentFixture<ProfileMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
