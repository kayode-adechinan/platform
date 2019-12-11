import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../product";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  constructor(private productService:ProductService) { }

  ngOnInit() {
  }


  delete(){

    if(window.confirm('Are you sure?')) {
     /* this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
        }
      )*/

      this.productService.delete(this.product.id).subscribe(data=>console.log(data),
        error => console.log(error));


    }


  }

}
