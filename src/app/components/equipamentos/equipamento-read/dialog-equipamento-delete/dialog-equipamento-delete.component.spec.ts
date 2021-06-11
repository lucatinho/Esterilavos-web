import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEquipamentoDeleteComponent } from './dialog-equipamento-delete.component';

describe('DialogEquipamentoDeleteComponent', () => {
  let component: DialogEquipamentoDeleteComponent;
  let fixture: ComponentFixture<DialogEquipamentoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEquipamentoDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEquipamentoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
