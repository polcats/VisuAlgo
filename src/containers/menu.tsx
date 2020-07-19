import React from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MenuSliders from './MenuSliders';
import MenuSelects from './MenuSelects';
import MenuControls from './MenuControls';

const Menu: React.FC<{}> = () => {
  return (
    <Box color="text.primary">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <MenuSliders />
        <MenuSelects />
        <MenuControls />
      </Grid>
    </Box>
  );
};

export default observer(Menu);
