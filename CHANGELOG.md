# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 12-10-2021

### Added
- New component which displays image details - opens when any image in the library is clicked
  - Displays file name of image, and alt text (if exists)
  - Offers the option to delete an image, or copy link to clipboard
  - Can exit the image details by clicking on [x] or clicking anywhere outside of component
- New Alert component, which pops up a message on screen for the following events:
  - Successful log in
  - Registering a new user
  - Log in errors
  - Successful image upload
  - Successful image deletion
  - Copying image link to clipboard
  - Successful log out
  - Successful change of profile picture
  - Can be dismissed prematurely by clicking on the alert.
- Additional menu component when clicking on profile at top right
  - Offers options to go to profile settings or log out
  - Can be dismissed by clicking outside of the field.
- New ProfileSettings route which:
  - Displays username, full name, account creation date, and profile picture
  - Allows for changing of profile picture by clicking on image
- Animations added to:
  - The Upload Area on Home Page
  - When clicking on Profile
  - Image details page
  - Various buttons on site
  - Alert Component
- Various pages were now optimized for mobile layout
- Website is now hosted on Netlify: [https://images.rodrig.dev](https://images.rodrig.dev)
### Changed
- Clicking on profile no longer logs user out, and instead pulls up a profile menu
- Clicking on an image no longer copies image link to clipboard, and instead opens up image details component
- Codebase underwent refactoring to place more logic back into App component
- Removed various instances of dead code and files no longer used
- When creating a new user, a default profile picture is used if the user does not have one assigned.
### Bugfixes
- Attempting to upload image while not logged in now throws an error
- Previously, the "Your Library" button did not work, and now does
## [0.3.0] - 11-10-2021

### Added

- User Authentication (Log in/Log out)
- User Registration - allows for creation of new users
- Added new Log in Route with additional Components
- Added userServives.ts, with Parse user authentication methods and session handling

### Changed

- Clicking the profile button when logged out allows a user to log in
- Clicking the profile button when logged in allows a user to log out
- A user can no longer go to a Photo Library page when not logged in

## [0.2.0] - 10-27-2021

### Added

- Added new Home Page which displays profile of current user, an area to upload images, and a button which routes to the Photo Library
- Added a `Your Library` header which directs to the default library, and displays images not associated with a folder
- Added what folders a user has, and if so, the user can click on the label to view images within that folder
- Added a `docs` folder with helpful information and diagrams about the project
- Added (an albeit temporary) favicon

### Changed

- Migrated framework to React from Preact
- Migrated codebase from Javascript to Typescript
- Migrated styling from CSS to SCSS
- CSS modules instead of a global CSS file are now used
- Removed data.json and replaced with a Parse backend which interfaces with Back4App
- Implemented Parse Mode services for Image and Folder tables
- Refactored the folder structure significantly to better reflect the organization/structuring of the project
