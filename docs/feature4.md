# Feature 4 Requirements

## Student A (Simon)
- [x] Make a UML diagram to show the relationship between tables
- [x] Initialize Parse correctly
- [x] Separate Parse model for each class

## Student B (Gerry)
- [x] Make multiple components
- [x] Configure webpack correctly
- [x] Correctly initialize routing and route from one module to another

## Both
- [x] Complete Code Review
- [x] Make parse queries in the services, not components
- [ ] Make a github release called `0.2.0` and update `CHANGELOG.md`
- [x] Load async data correctly
- [x] Comments
- [x] No Errors

# Brainstorming TODO list for Feature 4

## Refactor
- [x] Port PhotoLibrary components to React [`Gerry`]
- [x] Port existing CSS into CSS modules and separate by component (instead of
one big file like before) [`Simon`]
    - [x] Use a different CSS system (maybe SCSS or Styled Components?)

## Pages
- [ ] Finish PhotoLibrary page [`Simon & Gerry`]
    - [ ] Clicking on an image should expand the image like in the mockups
    - [ ] Image should have some actions that can be done with it (ideas below)
        - [ ] Copy link to image
        - [ ] Comment under image (idk about this one)
        - [ ] View image metadata (e.g. location? idk)
        - [ ] Add image name or description
- [x] Route from Home to PhotoLibrary and Vice Versa [`Gerry`]
- [x] Home Page [`Gerry`]
    - [x] Styling
    - [x] Box that can be dragged over with images

## Backend
- [x] Design a database schema for the whole project (should do work upfront 
because database is hard to modify in the future) [`Simon`]
    - [x] Photo
    - [x] User
    - [x] Photo Album
    - [x] Come up with more
- [x] Port our existing data into Back4App [`Simon`]
- [x] Write CRUD operations utilizing Back4App's API endpoints [`Simon`]

## Misc
- [x] UML Diagram for the database [`Simon`]
- [ ] Create GitHub release [`Gerry`]
- [ ] Make `CHANGELOG.md` [`Gerry`]