import { bezierButterFramerM } from '@/constants/css';
import { IAppState } from '@/typeDefs';
import { isSearchStateSearching } from '@/utils';
import { ListItem, Card, CardContent, Grid, Skeleton, Avatar, Chip } from '@mui/material';
import store from '@store/createStore';
import { getUiSel } from '@store/ui';
import { m } from 'framer-motion';
import { useSelector } from 'react-redux';

const searchResult = ( { index, style, onSearchResultClick } ) => {
  const appState = store.getState() as IAppState;
  const searchResults = getUiSel( appState ).searchResults;
  const searchState = useSelector( ( state: IAppState ) => getUiSel( state ).searchState );
  const searchResult = searchResults[ index ];
  if ( !searchResult ) return null;

  return (
    <ListItem 
      style={ style } 
      disablePadding 
      key={ index } 
      onClick={ () => onSearchResultClick( searchResult ) }
      className='hvr hvr-shrink'
    >
      <m.div
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        transition={ { duration: 1, delay: index * 0.03, ease: bezierButterFramerM } }
        style={ { width: '100%' } }
      >
        <Card sx={ { width: '100%' } }>
          <CardContent>
            <Grid justifyContent='center'>
              <Grid item>
                {isSearchStateSearching( searchState ) ? (
                  <Grid container alignItems='center'>
                    <Grid item>
                      <Skeleton animation='wave' variant='circular' width={ 40 } height={ 40 } />
                    </Grid>
                    <Grid item sx={ { ml: 2 } }>
                      <Skeleton animation='wave' variant='rectangular' width={ 250 } height={ 30 } />
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container alignItems='center'>
                    <Grid item sx={ { mr: 1 } }>
                      <Avatar sx={ { width: 40, height: 40 } } src={ searchResult.avatar_url } />
                    </Grid>
                    <Grid item>
                      <Chip color='secondary' label={ searchResult.login } />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </m.div>
    </ListItem>
  );
};

export default searchResult;
