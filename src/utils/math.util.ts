
export const calcMiddleNum = ( n: number ) => Math.floor( n / 2 )
export const isNumEven = ( num: number ) => num % 2 === 0;
export const convertToK =( num ) => num >= 1000 ? ( num / 1000 ).toFixed( 1 ) + 'K' : num.toString();
