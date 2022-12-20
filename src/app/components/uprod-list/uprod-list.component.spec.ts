import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UprodListComponent } from './uprod-list.component';

describe('UprodListComponent', () => {
  let component: UprodListComponent;
  let fixture: ComponentFixture<UprodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UprodListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UprodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
