import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaInstagramComponent } from './ia-instagram.component';

describe('IaInstagramComponent', () => {
  let component: IaInstagramComponent;
  let fixture: ComponentFixture<IaInstagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IaInstagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IaInstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
