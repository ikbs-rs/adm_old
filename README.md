# jwt-server
 JWT server 

 ## Da bi se instalirao `Jest`
 ### npm install --save-dev jest

 ## Komanda za `Babel`
 ### npm install --save-dev @babel/core @babel/cli @babel/preset-env

 ## Kreira se fajl u root direktorijumu `.babelrc` i u njega kopira sadržaj
 
 ### {
 ###   "presets": ["@babel/preset-env"]
 ### }

 # U `script` sekciju fajla `package.json` doda se sledeća linija
 
 ### "scripts": {
 ###   "babel": "babel src -d lib"
 ### }

 # Komanda za kreiranje `lib` direktorijuma
 ### npm run babel

 ## Instalacija neophodna za generisanje testova
 ### npm i --D jest-cli jest-babel-preprocessor --ignore-script