# Feature 4 Requirements

## Student A (Simon)
- [ ] Make a UML diagram to show the relationship between tables
- [ ] Initialize Parse correctly
- [ ] Separate Parse model for each class

## Student B (Gerry)
- [ ] Make multiple components
- [ ] Configure webpack correctly
- [ ] Correctly initialize routing and route from one module to another

## Both
- [ ] Complete Code Review
- [ ] Make parse queries in the services, not components
- [ ] Make a github release called `0.2.0` and update `CHANGELOG.md`
- [ ] Load async data correctly
- [ ] Comments
- [ ] No Errors

# Brainstorming TODO list for Feature 4

## Refactor
- [ ] Port PhotoLibrary components to React
- [ ] Port existing CSS into CSS modules and separate by component (instead of
one big file like before)
    - [ ] Use a different CSS system (maybe SCSS or Styled Components?)

## Pages
- [ ] Finish PhotoLibrary page
    - [ ] Clicking on an image should expand the image like in the mockups
    - [ ] Image should have some actions that can be done with it (ideas below)
        - [ ] Copy link to image
        - [ ] Comment under image (idk about this one)
        - [ ] View image metadata (e.g. location? idk)
        - [ ] Add image name or description
    - [ ] Set up routing to home page
- [ ] Home Page
    - [ ] Styling
    - [ ] Box that can be dragged over with images

## Backend
- [ ] Design a database schema for the whole project (should do work upfront 
because database is hard to modify in the future)
    - [ ] Photo
    - [ ] User
    - [ ] Come up with more
- [ ] Port our existing data into Back4App
- [ ] Write CRUD operations utilizing Back4App's API endpoints