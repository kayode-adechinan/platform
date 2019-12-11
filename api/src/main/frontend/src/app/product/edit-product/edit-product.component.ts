import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../product";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product:Product;
  id: number;

  constructor(private productService:ProductService,
              private route: ActivatedRoute) {

    //route.params.subscribe(params => this.id = params['id']);

    this.id = +route.snapshot.paramMap.get('id'); // + to convert to number

  }

  ngOnInit() {

   /* this.route.paramMap.subscribe(params => {
      this.id = +params.get("id")
    });*/

    this.productService.findById(this.id)
      .subscribe(data=>this.product=data, error => console.log(error));
  }

}
