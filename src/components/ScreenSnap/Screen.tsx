import { IRestProps } from '@/typeDefs';
import { Grid, Typography } from '@mui/material';

import ScreenSnap from '@components/ScreenSnap/ScreenSnap';

const Screen = ( { primaryTitle, primarySubtitle, lordIconSrc }: IRestProps ) => (
  <ScreenSnap lordIconSrc={ lordIconSrc }>
    <Grid flexDirection='column' alignItems='center'>
      <Grid item>
        <Typography variant='h3'>{ primaryTitle }</Typography>
      </Grid>
      <Grid item>
        <Typography variant='h5'>{ primarySubtitle }</Typography>
      </Grid>
    </Grid>
  </ScreenSnap>
);

export default Screen;
