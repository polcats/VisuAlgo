import React from 'react';
import { observer } from 'mobx-react-lite';

import Grid from '@material-ui/core/Grid';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import ReplayIcon from '@material-ui/icons/Replay';

const MenuControls: React.FC<{}> = () => {
  return (
    <Grid item>
      <PlayCircleFilledIcon color="primary" fontSize="large" />
      <PauseCircleFilledIcon color="primary" fontSize="large" />
      <ReplayIcon color="primary" fontSize="large" />
    </Grid>
  );
};

export default observer(MenuControls);
