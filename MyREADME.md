# TrackMED-NG

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.

## Changes
1. TSCONFIG.JSON

Notes: 
- Custom Elements require ES2015 classes ( i.e., "target": "es2015") or polyfill
- This program doesn't work, however, unless "target": "es5"
- For polyfill, see https://github.com/manfredsteyer/ngx-build-plus/issues/5

{
  "compilerOptions": {
  ...
    "target": "es5",
  ...
  }
}

