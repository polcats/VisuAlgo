import React from 'react';
import { observer } from 'mobx-react-lite';
import { StoreProps } from '../store/StoreProps';

import Grid from '@material-ui/core/Grid';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import ReplayIcon from '@material-ui/icons/Replay';

const MenuControls: React.FC<StoreProps> = ({ store }) => {
  return (
    <Grid item>
      <PlayCircleFilledIcon
        color={store.state === 0 || store.state === 2 ? 'primary' : 'disabled'}
        fontSize="large"
        onClick={() => {
          store.play();
        }}
      />
      <PauseCircleFilledIcon
        color={store.state !== 1 ? 'disabled' : 'primary'}
        fontSize="large"
        onClick={() => {
          store.pause();
        }}
      />
      <ReplayIcon
        color={store.state !== 1 ? 'primary' : 'disabled'}
        fontSize="large"
        onClick={() => {
          store.reset();
        }}
      />
    </Grid>
  );
};

export default observer(MenuControls);
