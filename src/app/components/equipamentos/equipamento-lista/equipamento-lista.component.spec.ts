import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoListaComponent } from './equipamento-lista.component';

describe('EquipamentoListaComponent', () => {
  let component: EquipamentoListaComponent;
  let fixture: ComponentFixture<EquipamentoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipamentoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
