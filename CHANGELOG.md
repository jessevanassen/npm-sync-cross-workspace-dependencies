# Changelog

## 0.1.2 - 2024-10-16
### Fixed
- Fix bug where some dependencies were skipped when updating. \
  `npm pkg get` behaves inconsistent with multiple keys. Now, the whole package.json content is retrieved, and all keys except dependency, devDependency and peerDependency are omitted as part of the script code.

## 0.1.1 - 2024-07-29
### Fixed
- Only parse the response of queries as JSON, don't process the results of set operations

## 0.1.0 - 2023-10-01
### Added
- Initial release of script
