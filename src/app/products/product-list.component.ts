import { Component } from "@angular/core";

@Component({
    selector: "products",
    templateUrl: "./product-list.component.html"
})
export class ProductListComponent {
    pageTitle: string = "Product List";
    products: any[] = [
        {
            "productId" : 1,
            "productName": "Garden Cart",
            "productCode": "GDN-0023",
            "releaseDate": "July 13, 2021",
            "description": "The best choise for your garden!",
            "price": 39.99,
            "starRating": 4.2,
            "imageUrl": ""
        }
    ];
}