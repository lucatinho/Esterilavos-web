import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoReadUnicoComponent } from './equipamento-read-unico.component';

describe('EquipamentoReadUnicoComponent', () => {
  let component: EquipamentoReadUnicoComponent;
  let fixture: ComponentFixture<EquipamentoReadUnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipamentoReadUnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentoReadUnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
