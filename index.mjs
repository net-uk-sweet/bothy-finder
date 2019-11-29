//import OsGridRef from 'geodesy/osgridref.js';
import OsGridRef, { LatLon } from './node_modules/geodesy/osgridref.js';
import fs from 'fs';

import munros from './munros-original.json';
// import { gridrefNumeric } from 'src/gridDistance';

 const processed = munros
   .filter(munro => munro['Post 1997'] === 'MUN')
   .map(munro => {
      const grid = munro['Grid Ref'];
      const [easting, northing] = gridrefNumeric(grid);
      const {lat, lon} = new OsGridRef(easting, northing).toLatLon(LatLon.datums.OSGB36);
      return {
         name: munro['Name'],
         grid: grid,
         url: munro['Hill-bagging'],
         height: munro['Height (m)'],
         lat,
         lon
      }
   });

 fs.writeFile('src/munros.json', JSON.stringify(processed), () => {
    console.log('wrote file');
 });

console.log(processed);


// .map(bothy => {
//    const [ac, east, north] = new OsGridRef(bothy.Easting, bothy.Northing).toString().split(' ');
//    return {
//       ...bothy,
//       GridRef: `${ac}${Math.round(east / 10)}${Math.round(north / 10)}`
//    }
// });

function gridrefNumeric(gridref) {
   // get numeric values of letter references, mapping A->0, B->1, C->2, etc:
   var letE = gridref.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
   var letN = gridref.toUpperCase().charCodeAt(1) - 'A'.charCodeAt(0);
   // shuffle down letters after 'I' since 'I' is not used in grid:
   if (letE > 7) letE -= 1;
   if (letN > 7) letN -= 1;
 
   // convert grid letters into 100km-square indexes from false origin (grid square SV):
   var e = ((letE+3)%5)*5 + (letN%5);
   var n = (19-Math.floor(letE/5)*5) - Math.floor(letN/5);
 
   // skip grid letters to get numeric part of ref, stripping any spaces:
   gridref = gridref.slice(2).replace(/ /g,'');
 
   // append numeric part of references to grid index:
   e += gridref.slice(0, gridref.length/2);
   n += gridref.slice(gridref.length/2);
 
   // normalise to 1m grid:
   switch (gridref.length) {
     case 6: e += '00'; n += '00'; break;
     case 8: e += '0'; n += '0'; break;
     // 10-digit refs are already 1m
   }
 
   return [e, n];
 }
