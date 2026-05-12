import { NavProps, NavGroupProps } from '../types';
import Stack from '@mui/material/Stack';
import { memo } from 'react';

import NavList from './nav-list';

// ----------------------------------------------------------------------
function NavSectionMini( { data, slotProps, ...other }: NavProps ) {
  return (
    <Stack 
		component='nav'
		id='nav-section-mini'
		spacing={ `${slotProps?.gap || 15}px` }
		 { ...other } 
		 style={ { 
			 height: 'fit-content',
			 borderRadius: '25px',
			 overflow: 'hidden',
			} }
		>
      {data.map( ( group, index ) => (
        <Group key={ group.subheader || index } items={ group.items } slotProps={ slotProps } />
      ) )}
    </Stack>
  );
}

export default memo( NavSectionMini );

// ----------------------------------------------------------------------

function Group( { items, slotProps }: NavGroupProps ) {
  return (
    <>
      {items.map( ( list ) => (
        <NavList key={ list.title } data={ list } depth={ 1 } slotProps={ slotProps } />
      ) )}
    </>
  );
}
