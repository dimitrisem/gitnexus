import { Paper } from '@mui/material';
import { NavSectionMini as NavMini } from '@vendor/MuiMinimal/components/nav-section'

import { routes } from '@constants/routing';

const NavBar = () => {
  const navItems = [ {
    items: [ ...routes ]
  } ];
	
  return (
    <Paper
      className='navbar'
      sx={ { 
        borderRadius: '25px',
        width:        '120px',
        overflowX:    'hidden',
        overflowY:    'auto' 
      } }>
      {/* @ts-ignore */}
      <NavMini data={ navItems } />
    </Paper>
  )
};

export default NavBar;
