import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriasCalculatorComponent } from './calorias-calculator.component';

describe('CaloriasCalculatorComponent', () => {
  let component: CaloriasCalculatorComponent;
  let fixture: ComponentFixture<CaloriasCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaloriasCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaloriasCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
