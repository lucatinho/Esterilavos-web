import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarOSComponent } from './enviar-os.component';

describe('EnviarOSComponent', () => {
  let component: EnviarOSComponent;
  let fixture: ComponentFixture<EnviarOSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarOSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarOSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
