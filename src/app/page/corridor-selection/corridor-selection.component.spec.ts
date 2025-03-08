import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridorSelectionComponent } from './corridor-selection.component';

describe('CorridorSelectionComponent', () => {
  let component: CorridorSelectionComponent;
  let fixture: ComponentFixture<CorridorSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorridorSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorridorSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
