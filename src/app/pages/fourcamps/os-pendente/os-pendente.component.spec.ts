import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsPendenteComponent } from './os-pendente.component';

describe('OsPendenteComponent', () => {
  let component: OsPendenteComponent;
  let fixture: ComponentFixture<OsPendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsPendenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsPendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
