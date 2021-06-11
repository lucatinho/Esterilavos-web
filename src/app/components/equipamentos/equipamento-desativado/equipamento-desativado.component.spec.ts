import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoDesativadoComponent } from './equipamento-desativado.component';

describe('EquipamentoDesativadoComponent', () => {
  let component: EquipamentoDesativadoComponent;
  let fixture: ComponentFixture<EquipamentoDesativadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipamentoDesativadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentoDesativadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
