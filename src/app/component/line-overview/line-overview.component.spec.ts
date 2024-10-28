import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineOverviewComponent } from './line-overview.component';

describe('LineOverviewComponent', () => {
  let component: LineOverviewComponent;
  let fixture: ComponentFixture<LineOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
