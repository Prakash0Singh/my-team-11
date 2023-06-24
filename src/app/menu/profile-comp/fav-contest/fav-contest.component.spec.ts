import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavContestComponent } from './fav-contest.component';

describe('FavContestComponent', () => {
  let component: FavContestComponent;
  let fixture: ComponentFixture<FavContestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavContestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
