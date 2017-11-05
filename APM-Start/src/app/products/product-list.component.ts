import {Component, OnInit} from '@angular/core';
import {IProduct} from  './product';
import { ProductService } from './product.service';

@Component({
    selector:'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
    
})

export class ProductListComponent implements OnInit{

  
    pageTitle:string='Product List';
    imageWidth:number=50;
    imageMargin:number=2;
    showImage:boolean=false;
    errorMessage:string;

    _listFilter:string;
    
    get listFilter() :string{
        return this._listFilter;
    }

    set listFilter(value:string){
        this._listFilter = value;
        this.filteredProducts = this._listFilter?this.performFilter(this._listFilter):this.products;
    }

    filteredProducts :IProduct[];

    products:IProduct[] = [] 
    

    constructor(private _productService:ProductService)
    {

    }   
    
    performFilter(filterBy:string):IProduct[]{
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product:IProduct) =>
           product.productName.toLocaleLowerCase().indexOf(filterBy) != -1);
    }
    onRatingClicked(message:string):void{
        this.pageTitle = 'Product List' +' ' + message;
    }
    toggleImage():void{
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        //console.log("OnInit method");
         this._productService.getProducts()
              .subscribe(
                  products => {
                      this.products = products;
                      this.filteredProducts = this.products;
                    },
                  error => this.errorMessage = <any>error
              );
        
    }
}