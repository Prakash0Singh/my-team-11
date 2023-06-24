import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldenTicketComponent } from './golden-ticket.component';

describe('GoldenTicketComponent', () => {
  let component: GoldenTicketComponent;
  let fixture: ComponentFixture<GoldenTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldenTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoldenTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
