import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPostEditComponent } from './detail-post-edit.component';

describe('DetailPostEditComponent', () => {
  let component: DetailPostEditComponent;
  let fixture: ComponentFixture<DetailPostEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPostEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
