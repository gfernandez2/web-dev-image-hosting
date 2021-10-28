# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
