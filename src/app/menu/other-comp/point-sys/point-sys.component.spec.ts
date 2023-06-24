import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointSysComponent } from './point-sys.component';

describe('PointSysComponent', () => {
  let component: PointSysComponent;
  let fixture: ComponentFixture<PointSysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointSysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointSysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
