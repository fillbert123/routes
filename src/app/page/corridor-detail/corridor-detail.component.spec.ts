import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridorDetailComponent } from './corridor-detail.component';

describe('CorridorDetailComponent', () => {
  let component: CorridorDetailComponent;
  let fixture: ComponentFixture<CorridorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorridorDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorridorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
