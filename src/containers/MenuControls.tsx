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
      <span className="menu-button" title="Play">
        <PlayCircleFilledIcon
          color={
            store.state === 0 || store.state === 2 ? 'primary' : 'disabled'
          }
          fontSize="large"
          onClick={() => {
            store.play();
          }}
        />
      </span>
      <span className="menu-button" title="Pause">
        <PauseCircleFilledIcon
          color={store.state !== 1 ? 'disabled' : 'primary'}
          fontSize="large"
          onClick={() => {
            store.pause();
          }}
        />
      </span>
      <span className="menu-button" title="Reset">
        <ReplayIcon
          color={store.state !== 1 ? 'primary' : 'disabled'}
          fontSize="large"
          onClick={() => {
            store.reset();
          }}
        />
      </span>
    </Grid>
  );
};

export default observer(MenuControls);
