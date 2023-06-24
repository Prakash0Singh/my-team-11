import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesLeaderboadComponent } from './series-leaderboad.component';

describe('SeriesLeaderboadComponent', () => {
  let component: SeriesLeaderboadComponent;
  let fixture: ComponentFixture<SeriesLeaderboadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesLeaderboadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesLeaderboadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
