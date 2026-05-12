import { Card, CardContent, Skeleton, Grid, Typography, Chip, Avatar } from '@mui/material';
import { getUiSel } from '@store/ui';
import { m } from 'framer-motion';
import { useSelector } from 'react-redux';

import { IAppState } from '@typeDefs';

import { blurInInit, blurInAnim, bezierButterFramerM } from '@constants/css';
import { aLetterIcon, locationIcon, nLetterIcon, repoUrlIcon, usersUrlIcon } from '@constants/lordicon';

import LordIcon from '@components/LordIcon/LordIcon';

const commonGridItemSpacing = 1;

const UserOverview = () => {
  const selectedUser = useSelector( ( state: IAppState ) => getUiSel( state ).selectedUser );
  const isFetchingUser = useSelector( ( state: IAppState ) => getUiSel( state ).isFetchingUser );
	
  return (
    <Grid alignItems='center' flexDirection='column'>
      {/* Avatar, Name, Username...*/}
      <m.div
        initial={ blurInInit }
        animate={ blurInAnim }
        transition={ { duration: 0.35, ease: bezierButterFramerM } }
      >
        <Grid item>
          <Card sx={ { minWidth: '215px' } }>
            <CardContent>
              <Grid flexDirection='column' alignItems='center'>
                <Grid item>
                  { isFetchingUser
                    ? <Skeleton animation='wave' className='skeleton' variant='circular' width={ 120 } height={ 120 } />
                    : <Avatar sx={ { width: '120px', height: '120px' } } src={ selectedUser.avatar_url } />
                  }
                </Grid>
                <Grid item sx={ { mt: commonGridItemSpacing } }>
                  { isFetchingUser
                    ? <Skeleton animation='wave' className='skeleton' width={ 200 } height={ 20 } />
                    : <Typography>{selectedUser.name}</Typography>
                  }
                </Grid>

                <Grid item sx={ { mt: commonGridItemSpacing } }>
                  { isFetchingUser
                    ? <Skeleton animation='wave' className='skeleton' width={ 130 } height={ 20 } />
                    : <Chip color='primary' label={ selectedUser.login } />
                  }
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </m.div>


      {/* User Details... */}
      <m.div
        initial={ blurInInit }
        animate={ blurInAnim }
        transition={ { duration: .35, delay: .1, ease: bezierButterFramerM } }
      >
        <Grid item sx={ { mt: 2 } }>
          <Card sx={ { minWidth: '300px' } }>
            <CardContent>
              <Grid flexDirection='column' alignItems='flex-start'>
                {/* Location... */}
                <Grid item sx={ { mb: commonGridItemSpacing } } alignItems='center'>
                  <Grid item sx={ { mr: commonGridItemSpacing } }>
                    <LordIcon size='sm' src={ locationIcon } />
                  </Grid>
									
                  <Grid item>
                    { isFetchingUser
                      ? <Skeleton animation='wave' className='skeleton' width={ 150 } height={ 20 } />
                      : <Chip color='info' label={ selectedUser.location } />
                    }
                  </Grid>
                </Grid>

                {/* Public Repos... */}
                <Grid item alignItems='center' sx={ { mb: commonGridItemSpacing } }>
                  <Grid item sx={ { mr: commonGridItemSpacing } }>
                    <LordIcon size='sm' src={ repoUrlIcon } />
                  </Grid>

                  <Grid item>
                    { isFetchingUser
                      ? <Skeleton animation='wave' className='skeleton' width={ 100 } height={ 20 } />
                      : <Chip color='info' label={ selectedUser.public_repos } />
                    }
                  </Grid>
                </Grid>

                {/* Followers... */}
                <Grid alignItems='center'>
                  <Grid item sx={ { mr: commonGridItemSpacing } }>
                    <LordIcon size='sm' src={ usersUrlIcon } />
                  </Grid>
                  
                  <Grid item>
                    { isFetchingUser
                      ? <Skeleton animation='wave' className='skeleton' width={ 100 } height={ 20 } />
                      : <Chip color='info' label={ selectedUser.followers } />
                    }
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </m.div>

      {/* Bio... */}
      <m.div
        initial={ blurInInit }
        animate={ blurInAnim }
        transition={ { duration: 0.35, delay: .2, ease: bezierButterFramerM } }
      >
        <Grid item sx={ { mt: 2 } }>
          <Card sx={ { width: '450px' } }>
            <CardContent>
              { isFetchingUser
                ? (
                  <Grid flexDirection='column'>
                    <Grid item sx={ { mb: commonGridItemSpacing } }>
                      <Skeleton animation='wave' className='skeleton' width={ 400 } height={ 20 } />
                    </Grid>
                    <Grid item sx={ { mb: commonGridItemSpacing } }>
                      <Skeleton animation='wave' className='skeleton' width={ 400 } height={ 20 } />
                    </Grid>
                    <Grid item sx={ { mb: commonGridItemSpacing } }>
                      <Skeleton animation='wave' className='skeleton' width={ 400 } height={ 20 } />
                    </Grid>
                    <Grid item>
                      <Skeleton animation='wave' className='skeleton' width={ 400 } height={ 20 } />
                    </Grid>
                  </Grid>
                )
                : selectedUser.bio === 'N/A' 
                  ? (
                    <Grid alignItems='center' justifyContent='center'>
                      <Grid item>
                        <LordIcon trigger='in' src={ nLetterIcon } />
                      </Grid>
                      <Grid item>
                        <Typography variant='h1'>/</Typography>
                      </Grid>
                      <Grid item>
                        <LordIcon trigger='in' src={ aLetterIcon } />
                      </Grid>
                    </Grid>
                  )
                  : (
                    <Typography sx={ { textAlign: 'center' } }> { selectedUser.bio} </Typography>
                  )
              }
            </CardContent>
          </Card>
        </Grid>
      </m.div>
    </Grid>
  );
}

export default UserOverview;
