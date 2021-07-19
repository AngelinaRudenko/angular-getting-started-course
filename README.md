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


