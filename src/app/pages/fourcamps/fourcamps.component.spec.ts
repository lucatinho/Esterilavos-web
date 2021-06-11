import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourcampsComponent } from './fourcamps.component';

describe('FourcampsComponent', () => {
  let component: FourcampsComponent;
  let fixture: ComponentFixture<FourcampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourcampsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourcampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
