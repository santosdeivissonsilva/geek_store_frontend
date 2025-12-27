import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SaleService } from '../../services/sale.service';
import { MyPurchasesComponent } from './my-purchases';

describe('MyPurchases', () => {
  let component: MyPurchasesComponent;
  let fixture: ComponentFixture<MyPurchasesComponent>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const saleServiceSpy = jasmine.createSpyObj('SaleService', ['getMyPurchases']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [MyPurchasesComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: SaleService, useValue: saleServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

