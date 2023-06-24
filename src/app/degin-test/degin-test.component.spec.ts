import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeginTestComponent } from './degin-test.component';

describe('DeginTestComponent', () => {
  let component: DeginTestComponent;
  let fixture: ComponentFixture<DeginTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeginTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeginTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
