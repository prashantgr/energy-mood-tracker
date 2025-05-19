import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyInputComponent } from './energy-input.component';

describe('EnergyInputComponent', () => {
  let component: EnergyInputComponent;
  let fixture: ComponentFixture<EnergyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
