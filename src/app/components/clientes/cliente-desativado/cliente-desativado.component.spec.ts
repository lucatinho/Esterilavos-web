import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDesativadoComponent } from './cliente-desativado.component';

describe('ClienteDesativadoComponent', () => {
  let component: ClienteDesativadoComponent;
  let fixture: ComponentFixture<ClienteDesativadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteDesativadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteDesativadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
