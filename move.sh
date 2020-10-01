#!/bin/sh
rm -rf css img js index.html favicon.ico
cd dist
mv -f css ../css
mv -f img ../img
mv -f js ../js
mv -f index.html ../index.html
mv -f favicon.ico ../favicon.ico
