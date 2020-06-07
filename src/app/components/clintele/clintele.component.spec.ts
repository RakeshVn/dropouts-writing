import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinteleComponent } from './clintele.component';

describe('ClinteleComponent', () => {
  let component: ClinteleComponent;
  let fixture: ComponentFixture<ClinteleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinteleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinteleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
