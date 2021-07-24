## "Angular: Getting Started" By Deborah Kurata

### Introduction
Angular is a JavaScript framework for building clint-side applications. Angular advantages:
- Expressive HTML;
- Powerful Data Binding;
- Modular by Design;
- Build-in Back-End Integration.

In Angular an application is comprised of a set of components and services that provide functionality across those components.

> Component = template (UI view) + class (properties and methods) + metadata (additional information about the component for Angular).

### First Things First

Need to install: 
- node.js (which also installs npm);
- Angular CLI.

`ng help` Displays available commands
`ng new <app name>` Create a new Angular application
`ng serve -o` Builds the app, launches a server and opens in browser
`ng add` Install package
`ng test` Rund unit test
`ng build` Compiles into an output directory (dir)
`ng update` Updates the Angular verion for the app

`ng generate` Generates code `–flat` with no directory:
`ng g c <component name>` Component
`ng g d <directive name>` Directive
`ng g g <guard name>` Route guard
`ng g i <interface name>` Interface
`ng g m <module name>` Module
`ng g p <pipe name>` Pipe
`ng g s <service name>` Service
`ng g cl` Class
``

`dir` See the list of created files
`code .` To open in vs code

In package.json you can see scripts and all installed packages.
```
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "lint": "ng lint"
  }
```
&uarr; `npm start` will execute `ng serve`.
src- source code of application directory.
The angular.json file is the CLI configuration file for our local installed Angular CLI.

### Introduction to Components

```
import { Component } from "@angular/core"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  propertyName: string = "Default value";
}
```
`@Component({...})` - Metadata. Metadata is extra data for Angular and is defined with decorator.

Decorator – a function that adds metadata to a class, its members, or its method arguments. Has prefix @. Angular provides build-in decorator @Component().

An Angular application is often called a Single Page Application (SPA).

### Templates, Interpolation, and Directives

Defining a template in a @Component:
1. Inline template `template: "...<>...</>"`
2. Linked template `templateUrl: "..."`

Defining styles in a @Component:
1. Inline  `styles: [ "div {color: red;}" ]`
2. Linked `styleUrls: ["..."]]`

Angular Build-in Directives:
- `*ngFor="let item of items"`
- `*ngIF`

### Data Binding & Pipes

Binding coordinates communication between the component's class and its template and often involves passing data.

**Interpolation** is one-way binding.
Template
`<>{{ propertyName }}</>`
Class
`propertyName: string = "Default value";`

**Property Binding**
`[src]="propertyName"`, where src - property

**Event Binding**
`(click)="methodName()"`, where (click) - event

All events are listed here: https://developer.mozilla.org/en-US/docs/Web/Events.

**Two-way Binding**
We enclose ngModel in square brackets to indicate property binding from the component to the input element and parentheses to indicate event binding to send a notification of the user-entered text back to the component.
Template
`<input type="text" [(ngModel)]="propertyName"/>`

!!! For ngModel you must import { FormsModule } from '@angular/forms'; and write it to imports in app.module.ts.

[()] - Banana in a box

Pipe example
`{{ propertyName | uppercase }}`

Custom pipe:
```
import { Pipe, PipeTransform } from "@angular/core";

@Pipe ({
    name: "convertToSpaces"
})
export class ConvertToSpacesPipe implements PipeTransform {
    transform(value: string, character: string): string {
        return value.replace(character, " ");
    }
}
```
Using a custom pipe
`{{ propertyName | convertToSpaces: "-" }}`

### More on Components

Two ways to use an interface:
1. As a type
```
export interface IProduct {
	name: string;
	price: number;
}
```
```
products: IProducts[] = [];
```
2. As a feature set
```
export interface IDoTiming {
	count: number;
	start(index: number): void;
}
```
```
export class MyComponent implements IDoTiming...
```

Component lifecycle:
1. Create
2. Render
3. Create and render children
4. Process changes
5. Destroy

A lifecycle hook is an interface we implement to write code when a component lifecycle event occurs.

Component Lifecycle Hooks:
- `OnInit` - perform component initialization, retrieve data
- `OnChanges` - perform action after change to input properties
- `OnDestroy` - perform cleanup

Using a lifecycle hook:
1. `import { OnInit } from "@angular/core"`
2. `export class MyComponent implements OnInit`
3. `ngOnInit(): void {...}`

Getters and Setters:
```
private _amount: number = 0;
get amount(): number {
	return this._amount;
}
set amount(value: number) {
	this._amount = value;
}
```

Classic named function (method)
```
capitilizeName(product: IProduct): string {
	return product.Name.toUpperCase();
}
```
Arrow function
```
(product: IProduct) => product.Name.toUpperCase();
```
Multi-statement arrow function
```
(product: IProduct) => {
	console.log(product.Name);
	product.Name.toUpperCase();
}
```

### Building Nested Component

**Container Component -> Nested Component**
Passing data to a nested component (@Input).
Nested Component
```
@Component({
	selector: "app-rating",
	templateUrl: "./rating.component.html"
})
export class RatingComponent {
	@Input() rating: number;
}
```
Container template
```
<app-rating [rating]="fieldName"></app-rating>
```

**Nested Component -> Container Component**
Emitting an Event (@Output)
Nested Component
```
@Component({
	selector: "app-rating",
	templateUrl: "./rating.component.html"
})
export class RatingComponent {
	@Output() notify: EventEmitter<string> = new EventEmitter<string>();
	
	onClick() {
	this.notify.emit("some value");
	}
}
```
Nested template
```
<div (click)="onClick()"></div>
```
Container Component
```
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html"
})
export class AppComponent {
	onNotify(message: string): void {
	...
	}
}
```
Container template
```
<app-rating (notify)="onNotify($event)"></app-rating>
```

### Services and Dependency Injection

Service - class with a focused puprose.
Dependency Injection - a coding pattern in which a class receives the instances of objectas it deens (dependencies) from an external source rather than creating them itself.

Service
```
@Injectable()
export class MyService {}
```
Injecting the Service 
````
constructor(private _myService: MyService)
```
In addition to the root application injector, Angular has an injector for each component.

Registrating a Service

| Root Injector | Component Injector |
| ------------ | ------------ |
| Service is available throughout the application | Service is available ONLY to taht component and its child (nested) components |
| Recommended for most scenarios |  Isolates a service used by only one component |
|  | Provides multiple instances of the service |

Registrating a Service
Root Injector - service will be available for all Components
```
@Injectable({
	providedIn: "root"
})
export class MyService {}
```
Component Injector - service will be available for parent component and children
```
@Component({
	providers: [MyService]
})
export class MyComponent {}
```

### Retrieving Data Using HTTP

Reactive Extensions (RxJS) is a library for composing data using observable sequences and transforming that data using operators.

Observable - a collection of items over time. Unlike an array, it doesn't retain items. Emitted items can be observed over time.

What does an Observable do? (Three types of notifications)
- Nothing until we subscribe.
- next: Next item is emitted
- error: An error occured and no more items are emitted
- complete: No more items are emitted

A common way to use Observables in an Angular application is to
1. start the observable with a subscribe
2. pipe each emitted item through a set of operators to modify or transform the item
3. process the notification from the observable. Recall the three notifications that an observable emits: next, error, complete.
4. stop the observable by unsubscribing. 

Example
```
const source$: Observable<number> = range(0, 10);

source$.pipe(
	map(x => x * 3).
	filter(x => x % 2 === 0)
).subscribe(x => console.log(x));
```

Setting up an HTTP Request
```
@Injectable({
	providedIn: "root"
})
export class ProductService {
	private productUrl: "www.myWebService.com/api/products";
	
	constructor(private http: HttpClient) {}
	
	getProducts(): Observable<IProduct[]> {
	return this.http.get<IProducts[]>(this.productUrl);
	}
}
```

For url you can also define directory in angular.json
```
"assets": [
	"src/favicon.ico",
	"src/assets",
	"src/api"
]
```

Exception Handling
Tap operator to access emitted file without modifying it.
Service:
```
getProducts(): Observable<IProduct[]> {
	return this.http.get<IProduct[]>(this.productUrl).pipe(
	tap(data => console.log(JSON.stringify(data))),
	catchError(this.handleError)
	);
}

private handleError(err: HttpErrorResponse) {
}
```
Component:
```
ngOnInit(): void {
	this.productService.getProducts().subscribe({
		next: products => this.products = products,
		error: err => this.errorMessage = err
	});
}
```

Subscribing to an Observable
```
x.subscribe()

x.subscribe(Observer)

x.subscribe({
	nextFunction,
	errorFunction,
	completeFunction
})

const sub = x.subscribe(...)
```

Unsubscribing from an Observable
- Store this subsription in a variable
- Implement the OnDestroy lifecycle hook
- Use the subscription variable to unsubscribe
```
ngOnDestroy(): void {
	this.subscriptionVariable.unsubscribe();
}
```

subscription: Subscription | undefined; //can be undefined
subscription!: Subscription; //will be assigned later

### Navigating and Routing Basics

Define the base element
```
<head>
	...
	<base href="/">
</head>
```

Add RouterModule
Add each route to forRoot array 
- order matters.
path: Url segment for the route 
- no leading slash
- `""` for default route
- `"**"` for wildcard route

RouterModule.for Root = registers router service + RouterModule.forChild
RouterModule.forChild = declares router directives + exposes configured router

NgModule
```
RouterModule.forRoot([
	{ path: "products", component: ProductListComponent },
	{ path: "products/:id", compoent: ProductDetailsComponent },
	{ path: "", redirectTo: "products", pathMatch: "full" },
	{ path: "**", redirectTo: "products", pathMatch: "full" }
])
```

Add the RouterLink directive as an attribute
Bind to a link parameters array
```
<a [routerLink]="['/products']">Product List</a>
<a routerLink="/welcome">Product List</a>
```

Add the RouterOutlet directive
- Identifies where to display the routed component's view
```
<router-outlet></router-outlet>
```

### Navigation and Routing Additional Technologies

```
{ path: "products/:id", compoent: ProductDetailsComponent }
```
Passing parameters to a route
```
<a [routerLink]="['/products', productId]">{{ productName }}</a>
```
Reading parameters from a route
```
constructor(private route: ActivatedRoute) {}
```
Snapshot: read the parameter one time
```
this.route.snapshot.paramMap.get("id");
```
Observable: read emitted parameters as they change
```
this.route.paramMap.subscribe()
	params => console.log(params.get("id"))
```
? -> Safe navigation operator
The safe navigation operator guards against null and undefined values when navigating an object’s properties. If an object is null or undefined, the safe navigation operator simply returns null and does not attempt to access the property, hence, we won’t see an undefined property error.

Activating route with code
```
onBack(): void {
	this.touter.navigate(['/products']);
}
```

Protecting routes with Guards
- CanActivate: Guard navigation to a route
- CanDeactivate: Guard navigation from a route
- Resolve: Pre-fetch data before activating a route
- CanLoad: prevent acynchronous routing

Building a Guard
```
@Injectable({
	providedIn: "root"
})
export class ProductDetailGuard implements CanActivate {
	canActivate(): boolean {
	...
	}
}
```

Using a Guard
```
RouterModule.forRoot([
	{ path: "products/:id", canActivate: [ProductDetailGuard], compoent: ProductDetailsComponent }
])
```

### Angular Modules

Angular Module - a class with NgModule decorator
Its purpose:
- organize the pieces of our application
- arrange the into blocks
- extend our application with capabilities from external libraries
- provide a template resolution environment
- aggregate and re-export

Module examples:
- RouterModule (routerLink, router-outlet)
- FormsModule ([(ngModule)])
- BrowserModule (*ngIf, *ngFor)

Module parts:
- imports
- exports
- declarations
- providers
- bootstrap

An Angular module can be extended by importing capabilities from other Angular modules using the imports array.
Adding a module to the imports array makes available any components, directives, and pipes defined in that module's exports array
Only import what this module needs. For each component declared in the module, add to the imports array what is needed by the component's template.
Imports are not inherited. Importing a module does NOT provide access to its imported modules.
Use the imports array to register services provided by Angular on third-party modules.

The export array of the @ngModule decorator allows to share an Angular module's components, directives and pipes with other modules.
Export any component, directive, and pipe if other components need it.
Re-export modules to re-export their components, directives, and pipes.
We can export something without including it in the imports array.

We use the declarations array of the @ngModule decorator to define the components, directives and pipes that belong to this Angular module.
Ecery component, directive, and pipe we create must belong to one and only one Angular module.
Only declare components, directives and pipes.
All declared  components, directives, and pipes are private by default. They are only accessible to other components, directives, and pipes declared in the same module.
The Angular module provides the template redolution environment for its component templates.

We can use the providers array to register services. BUT NOW IT’S NO MORE RECOMMENDED
Before: ``providers: [ ProductService ]
Now: `providedIn: "root"`

The bootstraps array of the @ngModule decorator defines the component that is the starting point of the application.
Every application must bootstrap at least one component, the root application component.
The bootstrap array should only be used in the root application module, AppModule.

Declarations – our
Imports – other sources

Summary:
Imports array: Modules this module needs.
Exports array: pieces to share. Often only used by shared modules.
Declarations array: what belongs to this module.
Bootstrap array: component with selector used in index.html 
```
<body>
	<app-root></app-root>
</body>
```
Normally only used by AppModule

### Deploying with CLI

`ng <command> <args> --<options>`

Installing the Angular CLI
`npm install -g @angular/cli`

`ng help`

Serving the application:
- compiles the application
- generates application bundles
- starts a local web server
- serves the application from memory
- rebuilds on file changes

`ng build` to deploy, minify/uglify in folder dist

### Enhancing development
- Install the Angular Language Service extencion for VS Code
- Implement lazy loading for improvedload performance
- Add ESLint using
- Use Angular forms for building and validating user-entry forms
- Leverage your Observable pipelines to process multiple datasets
