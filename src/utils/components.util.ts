import { darkBunker, darkEbonyClay, redCoral, silver, turquoiseBlue } from '@/constants/css';
import store from '@/store/createStore';
import { getUiThemeAddonSel } from '@/store/ui';
import { IAppState } from '@/typeDefs';
import { isAbyssalSurferThemeAddon } from '@utils';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

/* Particles... */
export const getParticlesConfig = ( speed: number = 5, size: number = 5, opacity: number = .8 ) => {
  const appState = store.getState() as IAppState;
  const uiThemeAddon = getUiThemeAddonSel( appState );
  const color = isAbyssalSurferThemeAddon( uiThemeAddon ) && silver
  return { 
    background: {
      color: {
        value: darkBunker
      },
      opacity: 0, // Ensure it's completely transparent, if necessary
    },
    particles: {
      number:      { value: 100, density: { enable: true, value_area: 800 } },
      color:       { value: [ color, color, color, color, color ] },
      shape:       { type: 'circle' },
      opacity:     { value: opacity, random: true },
      size:        { value: size, random: true },
      line_linked: { enable: false },
      move:        { enable: true, speed, direction: 'none', random: true, out_mode: 'out', bounce: false },
    },
    interactivity: {
      detect_on: 'canvas',
      events:    {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize:  true,
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push:    { particles_nb: 4 },
      },
    },
    retina_detect: true,
  }
};

export const getVirtualizedRowClassName = ( entity, index ) => {
  if ( index < 0 ) return ''; // Header row

  const rowData = entity[ index ];

  return classNames( 'virtualized-row', {
    'delete': rowData?.delete
  } );
}

export const getFilters = ( total: number, splitter: number = 50 ) => {
  const numFilters = Math.ceil( total / splitter );
  const filters: Array<number> = [];

  for ( let i = 0; i < numFilters; i++ ) {
    const endRange = Math.min( ( i + 1 ) * splitter, total );

    if ( endRange === total ) {
      filters.push( endRange );
      break; 
    }

    filters.push( endRange );
  }

  if ( filters.length === 0 ) {
    filters.push( 1 );
  }

  return filters;
};
