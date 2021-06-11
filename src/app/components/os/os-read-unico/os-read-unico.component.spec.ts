import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsReadUnicoComponent } from './os-read-unico.component';

describe('OsReadUnicoComponent', () => {
  let component: OsReadUnicoComponent;
  let fixture: ComponentFixture<OsReadUnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsReadUnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsReadUnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
