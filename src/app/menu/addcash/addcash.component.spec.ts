import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcashComponent } from './addcash.component';

describe('AddcashComponent', () => {
  let component: AddcashComponent;
  let fixture: ComponentFixture<AddcashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
