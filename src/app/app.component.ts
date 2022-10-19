//angular dependencies
import { Component, OnInit, ViewChild } from '@angular/core';

//material modules
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


//component imported
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { IProduct } from './services/Model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-crud-LP';

  //table properties
  displayedColumns: string[] = ['productName', 'category', 'productFreshness', 'price', 'comment', 'date', 'action']; // match with the api
  dataSource!: MatTableDataSource<IProduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }


  openDialog() {
    this.dialog.open(DialogComponent, {
      // we can add some properties to dialog box here
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value === 'Save') {
        this.getAllProducts()
      }
    })
  }

  getAllProducts() {
    this.api.getProduct().subscribe({
      next: (response) => {
        // console.log(response)
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: (err) => {
        alert('error while fetching the data')
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: IProduct) {
    // console.log(row)
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row // for dialog open
    }).afterClosed().subscribe(value => {
      if (value === 'Update') {
        this.getAllProducts()
      }
    })
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: (response) => {
        alert('selected product is deleted')
        this.getAllProducts()
      },
      error: (err) => {
        alert('some error occured')
      }
    })
  }
}
