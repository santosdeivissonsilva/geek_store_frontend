import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SaleService } from '../../services/sale.service';
import { SalesManagementComponent } from './sales-management';

describe('SalesManagement', () => {
  let component: SalesManagementComponent;
  let fixture: ComponentFixture<SalesManagementComponent>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const saleServiceSpy = jasmine.createSpyObj('SaleService', ['getAllSales']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [SalesManagementComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: SaleService, useValue: saleServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

