import { Component, OnInit } from "@angular/core";
import { IProduct } from "./IProduct";

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

    products: IProduct[] = [
        {
            productId : 1,
            productName: "Garden Cart",
            productCode: "GDN-0023",
            releaseDate: "July 13, 2021",
            description: "The best choise for your garden!",
            price: 39.99,
            starRating: 4.2,
            imageUrl: "assets/images/garden_cart.png"
        }
    ];

    set filterText(value: string) {
        this._filterText = value;
        this.filteredProducts = this.filterProducts(value);
    }

    get filterText(): string{
        return this._filterText;
    }

    ngOnInit(): void {
        console.log("init");
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
}