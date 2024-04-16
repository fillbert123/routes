import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridorIconComponent } from './corridor-icon.component';

describe('CorridorIconComponent', () => {
  let component: CorridorIconComponent;
  let fixture: ComponentFixture<CorridorIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorridorIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorridorIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
