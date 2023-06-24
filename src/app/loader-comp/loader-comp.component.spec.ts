import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderCompComponent } from './loader-comp.component';

describe('LoaderCompComponent', () => {
  let component: LoaderCompComponent;
  let fixture: ComponentFixture<LoaderCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
