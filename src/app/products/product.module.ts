import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailsComponent } from './product-details.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailsGuard } from './product-details.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ConvertToSpacesPipe  
  ],
  imports: [
    RouterModule.forChild([
      { path: "products", component: ProductListComponent },
      { path: "products/:id", canActivate: [ProductDetailsGuard], component: ProductDetailsComponent },
    ]),
    SharedModule
  ]
})
export class ProductModule { }
