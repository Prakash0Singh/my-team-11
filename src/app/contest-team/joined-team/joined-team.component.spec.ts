import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedTeamComponent } from './joined-team.component';

describe('JoinedTeamComponent', () => {
  let component: JoinedTeamComponent;
  let fixture: ComponentFixture<JoinedTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinedTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinedTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
