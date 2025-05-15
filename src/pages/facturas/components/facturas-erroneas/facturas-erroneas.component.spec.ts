import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasErroneasComponent } from './facturas-erroneas.component';

describe('FacturasErroneasComponent', () => {
  let component: FacturasErroneasComponent;
  let fixture: ComponentFixture<FacturasErroneasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturasErroneasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturasErroneasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
