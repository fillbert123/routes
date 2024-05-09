import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminusSelectionComponent } from './terminus-selection.component';

describe('TerminusSelectionComponent', () => {
  let component: TerminusSelectionComponent;
  let fixture: ComponentFixture<TerminusSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminusSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerminusSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
