import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationFormComponent } from './modification-form.component';

describe('ModificationFormComponent', () => {
  let component: ModificationFormComponent;
  let fixture: ComponentFixture<ModificationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
