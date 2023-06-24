import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestTeamComponent } from './contest-team.component';

describe('ContestTeamComponent', () => {
  let component: ContestTeamComponent;
  let fixture: ComponentFixture<ContestTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
