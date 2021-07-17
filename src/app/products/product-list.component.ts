import { Component, OnInit } from "@angular/core";
import { IProduct } from "./IProduct";
import { ProductService } from "./product.service";

@Component({
    selector: "products",
    templateUrl: "./product-list.component.html",
    styleUrls: [ "./product-list.component.css" ]
})
export class ProductListComponent implements OnInit {
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    isImageVisible: boolean = true;
    buttonShowHideText: string = "Hide";
    private _filterText: string = "";
    filteredProducts: IProduct[] = [];

    products: IProduct[] = [];

    set filterText(value: string) {
        this._filterText = value;
        this.filteredProducts = this.filterProducts(value);
    }

    get filterText(): string{
        return this._filterText;
    }

    constructor(private _productService: ProductService) {}

    ngOnInit(): void {
        this.products = this._productService.getHardCodedProducts();
        this.filteredProducts = this.products;
    }

    showHideImage(): void {
        this.isImageVisible = !this.isImageVisible;
        this.isImageVisible ? this.buttonShowHideText = "Hide" : this.buttonShowHideText = "Show";
    }

    filterProducts(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().includes(filterBy));
    }

    onNotify(value: string): void {
        console.log(value);
    }
}