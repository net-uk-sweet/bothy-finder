/*
 * Calculate distance between two National Grid Reference points.
 *
 * 100km grid squares are in 5x5 blocks (total 7x13 blocks); 
 * blocks increment left-right then top-bottom (HL-JM down to SV-TW);
 * letter I is skipped to give 25 letters.
 *
 * http://www.ordnancesurvey.co.uk/oswebsite/freefun/nationalgrid/nghelp1.html
 */


export default function gridDistance(ref1, ref2) {
  // ref1 & ref2 may be 6- or 8-digit references eg SU387148 or SU38714856

  // convert to fully numeric references
  var p1 = gridrefNumeric(ref1);
  var p2 = gridrefNumeric(ref2);

  // get E/N distances between ref1 & ref2
  var deltaE = p2[0]-p1[0];
  var deltaN = p2[1]-p1[1];

  // and pythagoras gives us the distance between the points
  var dist = Math.sqrt(deltaE*deltaE + deltaN*deltaN);

  return (dist/1000).toFixed(2); // return result in km, 2 decimals
}


function gridBearing(ref1, ref2) {
  // split numeric references into arrays
  var p1 = gridrefNumeric(ref1);
  var p2 = gridrefNumeric(ref2);

  // get E/N distances between ref1 & ref2
  var deltaE = p2[0]-p1[0];
  var deltaN = p2[1]-p1[1];

  // arctan gives us the bearing, just need to convert -pi..+pi to 0..360 deg
  var deg = (90-(Math.atan2(deltaN, deltaE)/Math.PI*180)+360) % 360;
  
  return deg.toFixed(0);  // return result in degrees, no decimals
}


/* 
 * convert standard grid reference ('SU387148') to fully numeric ref ([438700,114800])
 *
 *   note that northern-most grid squares will give 5-digit northings
 *   no error-checking is done on gridref (bad input will give bad results or NaN)
 */
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