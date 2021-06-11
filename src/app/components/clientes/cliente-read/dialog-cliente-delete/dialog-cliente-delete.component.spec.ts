import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClienteDeleteComponent } from './dialog-cliente-delete.component';

describe('DialogClienteDeleteComponent', () => {
  let component: DialogClienteDeleteComponent;
  let fixture: ComponentFixture<DialogClienteDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogClienteDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogClienteDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
