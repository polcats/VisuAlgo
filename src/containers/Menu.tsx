import React from 'react';
import { observer } from 'mobx-react-lite';
import { StoreProps } from '../store/StoreProps';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MenuSliders from '../components/MenuSliders';
import MenuSelects from '../components/MenuSelects';
import MenuControls from '../components/MenuControls';

const Menu: React.FC<StoreProps> = ({ store }) => {
  return (
    <Box color="text.primary" id="menu-bar">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <MenuSliders store={store} />
        <MenuSelects store={store} />
        <MenuControls store={store} />
      </Grid>
    </Box>
  );
};

export default observer(Menu);
