import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsImpressaoComponent } from './os-impressao.component';

describe('OsImpressaoComponent', () => {
  let component: OsImpressaoComponent;
  let fixture: ComponentFixture<OsImpressaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsImpressaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsImpressaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
