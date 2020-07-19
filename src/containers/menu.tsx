import React from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MenuSliders from './MenuSliders';
import MenuRadios from './MenuRadios';
import MenuSelects from './MenuSelects';

const Menu: React.FC<{}> = () => {
  return (
    <Box color="text.primary">
      <Grid container spacing={3}>
        <Grid item xs>
          <MenuSliders />
        </Grid>
        <Grid item xs>
          <MenuRadios />
        </Grid>
        <Grid item xs>
          <MenuSelects />
        </Grid>
      </Grid>
    </Box>
  );
};

export default observer(Menu);
