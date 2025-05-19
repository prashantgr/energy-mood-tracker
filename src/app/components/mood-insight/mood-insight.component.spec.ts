import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodInsightComponent } from './mood-insight.component';

describe('MoodInsightComponent', () => {
  let component: MoodInsightComponent;
  let fixture: ComponentFixture<MoodInsightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodInsightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
