import { IReduxPagination } from '@typeDefs';

import { reduxPaginationDefault } from '@constants/redux';

export const extractPaginationFromLink = ( url: string, direction ) => {
  let paramsObject = {
    perPage: reduxPaginationDefault[ direction ].perPage,
    page:    reduxPaginationDefault[ direction ].page
  };

  if ( url ) {
    const urlObject = new URL( url );
    const params = new URLSearchParams( urlObject.search );
    const perPage = parseInt( params.get( 'per_page' ) as string, 10 );
    const page = parseInt( params.get( 'page' ) as string, 10 );
    paramsObject = {
      perPage,
      page,
    };
  }

  return paramsObject;
};

export const getGitHubApiPaginationLinks = ( linkHeader ) => {
  if ( !linkHeader ) return null;
    
  const links = linkHeader.split( ',' ).reduce( ( acc, link ) => {
    const match = link.match( /<(.*?)>; rel="(next|prev|first|last)"/ );
    if ( match ) {
      acc[ match[ 2 ] ] = match[ 1 ];
    }
    return acc;
  }, {} );

  return links;
};

export const calcTotalPaginationCount = ( totalPages: number, perPage: number ) => totalPages * perPage;

export const extractPaginationFromHeader = ( linkHeader ) => {
  if ( !linkHeader ) { return; }
  const links = getGitHubApiPaginationLinks( linkHeader );
  const paginationFirst = extractPaginationFromLink( links.first, 'first' );
  const paginationPrev = extractPaginationFromLink( links.prev, 'prev' );
  const paginationLast = extractPaginationFromLink( links.last, 'last' );
  const paginationNext = extractPaginationFromLink( links.next, 'next' );
  const totalPages = paginationLast?.page;
  const perPage = paginationLast?.perPage; // The per_page parameter you used in the request
  const totalPagination = calcTotalPaginationCount( totalPages, perPage );

  return {
    first: paginationFirst,
    prev:  paginationPrev,
    last:  paginationLast,
    next:  paginationNext,
    total: totalPagination,
  } as IReduxPagination;
};
