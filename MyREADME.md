# TrackMED-NG

This project uses bootstrap 3.3.7 (not the latest version) and, therefore, uses the old grid layout. It also uses angular 8. Moving to angular 9 creates problems for custom elements

It also has the ability to use custom elements to generate child screens for all tables including the Location table

After modification, it can now display child elements using normal HTML for all tables including the Location table which can only be displayed previously using custom elements

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

