import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsExecutadasComponent } from './os-executadas.component';

describe('OsExecutadasComponent', () => {
  let component: OsExecutadasComponent;
  let fixture: ComponentFixture<OsExecutadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsExecutadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsExecutadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
