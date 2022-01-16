## Project description

This is a simple app to control people's access to doors.
It provides the following functionality:
* viewing and editing persons
* viewing and editing doors
* and managing access to doors

## Challenge

In this project is already implement the logic of viewing and editing persons. You need to implement similar logic for doors and add a possibility to give access permissions to people.
Doors and persons must be connected with many-to-many association. To do this, implement `DoorAccessService` along with `DoorService`.
`DoorAccessService` must store and manage references to persons and doors that different people have access to.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
