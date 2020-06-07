import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterDetailsComponent } from './writer-details.component';

describe('WriterDetailsComponent', () => {
  let component: WriterDetailsComponent;
  let fixture: ComponentFixture<WriterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
