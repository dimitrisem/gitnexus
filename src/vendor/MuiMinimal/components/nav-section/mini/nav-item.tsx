import Iconify from '../../iconify';
import { NavItemProps, NavItemStateProps } from '../types';
import { blueNigara, turquoiseBlue, turquoiseWaterLeaf } from '@/constants/css';
import { useGlassFx } from '@/hooks/useGlassFx';
import { getUiThemeSel } from '@/store/ui';
import { IAppState } from '@/typeDefs';
import { isDarkTheme } from '@utils';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { RouterLink } from 'src/routes/components';

import GlassFx from '@components/GlassFx/GlassFx';

// ----------------------------------------------------------------------
const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  (
    {
      title,
      path,
      icon,
      info,
      disabled,
			hidden,
      caption,
      roles,
      //
      open,
      depth,
      active,
      hasChild,
      externalLink,
      currentRole = 'admin',
      ...other
    },
    ref
  ) => {
    const subItem = depth !== 1;
		const glassFx = useGlassFx();

    const renderContent = (
			/* @ts-ignore */
      <Box 
			sx={{
				m: 0,
				p: 0,
				width: '130px',
				display: 'flex',
				justifyContent: 'center',
				borderRadius: '25px',
				/* @ts-ignore */
				width: '100%',
			}} 
			onMouseEnter={ glassFx.onGlassMouseEnter }
			className={ glassFx.glassFxChildClass }
			ref={glassFx.ref}
			>
        <StyledNavItem
          disableGutters
          ref={ ref }
          open={ open }
          depth={ depth }
          active={ active }
          disabled={ disabled }
          { ...other }
        >
          {icon && (
            <Box component='span' className='icon' sx={{height: 'fit-content !important'}}>
              {icon}
            </Box>
          )}

          {title && (
            <Box component='span' className='label'>
              {title}
            </Box>
          )}

          {caption && (
            <Tooltip title={ caption } arrow placement='right'>
              <Iconify width={ 16 } icon='eva:info-outline' className='caption' />
            </Tooltip>
          )}

          {info && subItem && (
            <Box component='span' className='info'>
              {info}
            </Box>
          )}

          {hasChild && <Iconify width={ 16 } className='arrow' icon='eva:arrow-ios-forward-fill' />}
        </StyledNavItem>
        <GlassFx useGlassFx={glassFx} />
      </Box>
    );

    // Hidden item by role
    if ( roles && !roles.includes( `${currentRole}` ) ) {
      return null;
    }

    if ( externalLink )
      return (
        <Link
          href={ path }
          target='_blank'
          rel='noopener'
          color='inherit'
          underline='none'
          sx={ {
            width: 1,
            ...( disabled && { cursor: 'default', } ),
						...( hidden && { display: 'none', } ),
          } }
        >
          {renderContent}
        </Link>
      );

    return (
      <Link
        component={ RouterLink }
        href={ path }
        color='inherit'
        underline='none'
        sx={ {
          width: 1,
          ...( disabled && { cursor: 'default' } ),
					...( hidden && { display: 'none', } ),
          // overflow: 'hidden',
        } }
      >
        {renderContent}
      </Link>
    );
  }
);

export default NavItem;

// ----------------------------------------------------------------------

const StyledNavItem = styled( ListItemButton, {
  shouldForwardProp: ( prop ) => prop !== 'active',
} )<NavItemStateProps>( ( { active, open, depth, theme } ) => {
	const uiTheme = useSelector( ( state: IAppState ) => getUiThemeSel( state ) );
  const subItem = depth !== 1;

  const opened = open && !active;

  const lightMode = theme.palette.mode === 'light';

  const noWrapStyles = {
    width:        '100%',
    maxWidth:     '100%',
    display:      'block',
		borderRadius: '25px',
    //overflow:     'hidden',
    // whiteSpace:   'nowrap',
    textOverflow: 'ellipsis',
    fontSize:     '15px',
  } as const;

  const baseStyles = {
    item: {
      borderRadius: 6,
      color:        theme.palette.text.secondary,
    },
    icon: {
      width:      'fit-content',
      height:     55,
      flexShrink: 0,
    },
    label: {
      textTransform: 'capitalize',
    },
    caption: {
      color: theme.palette.text.disabled,
    },
  } as const;

  return {
    // Root item
    ...( !subItem && {
      ...baseStyles.item,
      fontSize:       10,
      minHeight:      56,
      lineHeight:     '16px',
      textAlign:      'center',
      flexDirection:  'column',
      justifyContent: 'center',
      padding:        theme.spacing( 0.5 ),
      margin:         theme.spacing( 0, 0.5 ),
      boxSizing:      'border-box',
      fontWeight:     theme.typography.fontWeightSemiBold,
      '& .icon':      {
        ...baseStyles.icon,
      },
      '& .label': {
        ...noWrapStyles,
        ...baseStyles.label,
        marginTop: theme.spacing( 0.5 ),
      },
      '& .caption': {
        ...baseStyles.caption,
        top:      11,
        left:     6,
        position: 'absolute',
      },
      '& .arrow': {
        top:      11,
        right:    6,
        position: 'absolute',
      },
			"&:after": {
				content: `''`,
				height: '5px',
				width: '35px',
				marginTop: '15px',
				backgroundColor: blueNigara,
				transformOrigin: 'center',
				opacity: 0,
				transform: 'scale3d(0, 1, 1)',
				transition: 'transform .25s ease, opacity .25s ease',
			},
      ...( active && {
        fontWeight:      theme.typography.fontWeightBold,
        '&:after': {
					opacity: 1,	
					content: `''`,
					height: '5px',
					width: '35px',
					marginTop: '15px',
					backgroundColor: blueNigara,
					transformOrigin: 'center',
					transform: 'scale3d(1.1, 1.1, 1.1)',
					transition: 'transform .25s ease, opacity .25s ease',
				},
        color:           isDarkTheme(uiTheme) ? turquoiseWaterLeaf : blueNigara,
      } ),
      ...( opened && {
        color:           theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
      } ),
    } ),

    // Sub item
    ...( subItem && {
      ...baseStyles.item,
      ...theme.typography.body2,
      minHeight:  34,
      padding:    theme.spacing( 0, 1 ),
      fontWeight: theme.typography.fontWeightMedium,
      '& .icon':  {
        ...baseStyles.icon,
        marginRight: theme.spacing( 1 ),
      },
      '& .label': {
        ...baseStyles.label,
        flexGrow: 1,
      },
      '& .caption': {
        ...baseStyles.caption,
        marginLeft: theme.spacing( 0.75 ),
      },
      '& .info': {
        display:    'inline-flex',
        marginLeft: theme.spacing( 0.75 ),
      },
      '& .arrow': {
        marginLeft:  theme.spacing( 0.75 ),
        marginRight: theme.spacing( -0.5 ),
      },
      ...( active && {
        color:           theme.palette.text.primary,
        backgroundColor: theme.palette.action.selected,
        fontWeight:      theme.typography.fontWeightSemiBold,
      } ),
      ...( opened && {
        color:           theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
      } ),
    } ),
  };
} );
