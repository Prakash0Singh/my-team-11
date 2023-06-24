import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalitiesComponent } from './legalities.component';

describe('LegalitiesComponent', () => {
  let component: LegalitiesComponent;
  let fixture: ComponentFixture<LegalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
