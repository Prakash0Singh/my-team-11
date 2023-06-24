import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TCComponent } from './t-c.component';

describe('TCComponent', () => {
  let component: TCComponent;
  let fixture: ComponentFixture<TCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
