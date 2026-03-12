import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosIaComponent } from './servicios-ia.component';

describe('ServiciosIaComponent', () => {
  let component: ServiciosIaComponent;
  let fixture: ComponentFixture<ServiciosIaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosIaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
