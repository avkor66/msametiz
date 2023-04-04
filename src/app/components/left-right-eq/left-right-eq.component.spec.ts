import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftRightEqComponent } from './left-right-eq.component';

describe('LeftRightComponent', () => {
  let component: LeftRightEqComponent;
  let fixture: ComponentFixture<LeftRightEqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftRightEqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftRightEqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
