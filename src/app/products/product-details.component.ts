import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './IProduct';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  pageTitle: string = "Product Details";
  productId!: number;
  product: IProduct | undefined;
  subscription!: Subscription;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService) { }

  ngOnInit(): void {
    this.productId = Number(this._route.snapshot.paramMap.get("id"));
    this.subscription = this._productService.getProduct(this.productId).subscribe({
      next: product => this.product = product
    });
  }

  onBack(): void {
    this._router.navigate(["/products"]);
  }
}
