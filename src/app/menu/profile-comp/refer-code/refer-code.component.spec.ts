import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferCodeComponent } from './refer-code.component';

describe('ReferCodeComponent', () => {
  let component: ReferCodeComponent;
  let fixture: ComponentFixture<ReferCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
