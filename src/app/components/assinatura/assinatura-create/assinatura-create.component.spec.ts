import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinaturaCreateComponent } from './assinatura-create.component';

describe('AssinaturaCreateComponent', () => {
  let component: AssinaturaCreateComponent;
  let fixture: ComponentFixture<AssinaturaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssinaturaCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssinaturaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
