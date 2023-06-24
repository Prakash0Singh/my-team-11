import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompLeaderboardComponent } from './comp-leaderboard.component';

describe('CompLeaderboardComponent', () => {
  let component: CompLeaderboardComponent;
  let fixture: ComponentFixture<CompLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompLeaderboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
