import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from '../services/Model/model';
import { IDropDown } from '../services/Model/model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  //variables and properties
  productFreshnessList: string[] = ['Brand New', 'Second hand', 'Refurbished']
  selectedValue!: string;
  productForm!: FormGroup
  actionButton: string = "Save"
  selectedDropDownValue!: string
  listOfDropDown!: IDropDown[]

  constructor(private fb: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: IProduct // data coming from app.component for editing
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      productFreshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    })
    // console.log(this.editData)
    if (this.editData) {
      this.actionButton = "Update"
      this.productForm.patchValue({
        productName: this.editData.productName,
        category: this.editData.category,
        productFreshness: this.editData.productFreshness,
        price: this.editData.price,
        comment: this.editData.comment,
        date: this.editData.date
      })
    }
    // dropDown call
    this.api.getDropDown().subscribe({
      next: (response) => {
        this.listOfDropDown = response
      },
      error: (err) => {
        alert('something happend while loading the dropdown')
      }
    })
  }

  addProduct() {
    if (this.actionButton === 'Save') {
      // console.log(this.productForm.value)
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (response) => {
            alert('product added successfully')
            this.productForm.reset()
            this.dialogRef.close('Save')
          },
          error: (err) => {
            alert('error while added the product',)
          }
        }) // whatever value we get on submit will now posted to api now
      }
    } else {
      this.updateProduct()
    }
  }

  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (response) => {
        alert('data is updated successfully')
        this.productForm.reset()
        this.dialogRef.close('Update')
      },
      error: (err) => {
        alert('some error has occured')
      }
    })
  }
}
