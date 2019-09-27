import { QuotationsService } from './../../services/quotations.service';
import { Quotation } from 'src/app/models/quotation';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormArray, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation-create',
  templateUrl: './quotation-create.page.html',
  styleUrls: ['./quotation-create.page.scss'],
})
export class QuotationCreatePage implements OnInit {

  quotationForm: FormGroup;
  quotation : Quotation;
  products: [{productId: 1, productName: 'prod-1'}, {productId: 2, productName: 'prod-2'}];

  // Property
  get quotationLines(): FormArray {
    return this.quotationForm.get('quotationItems') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private quotationsService:QuotationsService,
    private router: Router
    ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.quotationForm = this.fb.group({
      quotationNo: ['', Validators.required],
      quotationDate: ['', Validators.required],
      customer: ['0', Validators.required],
      expireDate: ['', Validators.required],
      paymentTerm: '0',
      referenceNo: '',
      pic: '',
      subtotal: [0, Validators.required],
      otherCharges: [0, Validators.required],
      vat: [0, Validators.required],
      grandTotal: [0, Validators.required],
      quotationItems: this.fb.array([this.createQuotationItems()])

    });
  }
  createQuotationItems(): FormGroup {
    return this.fb.group({
      productId: [0, Validators.required],
      productName: ['', Validators.required],
      qty: [0, Validators.required],
      unitPrice: [0, Validators.required],
      discount: [0, Validators.required],
      lineTotal: [0, Validators.required]
    });
  }

  addItem() {
    this.quotationLines.push(this.createQuotationItems());
  }
  removeItem(i: number) {
    this.quotationLines.removeAt(i);
  }

  GetProductInfo(ctrl: HTMLInputElement, quotationLine) {

  }

  calculateLineTotal(line: AbstractControl) {

  }

  submit() {
    this.quotation = Object.assign({},this.quotationForm.value);
    console.log('this.quotation',this.quotation);
    if(this.quotationForm.valid){
          this.quotationsService.addQuotaion(this.quotation).subscribe(
      res=>{
        console.log('test',res);
      })
    this.router.navigateByUrl('app/quotations/list');  
      
    }else{
      console.log('test');
      
    }

      
  }
}
