import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreProps } from '../store/StoreProps';
import { MenuStates } from '../models/MenuModel';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const Display: React.FC<StoreProps> = ({ store }) => {
  useEffect(() => {
    if (store.state !== MenuStates.playing) {
      return;
    }

    setTimeout(() => {
      store.solStep++;
      if (!store.solution[store.solStep]?.bars) {
        store.state = 3;
        return;
      }
      store.bars = store.solution[store.solStep].bars;
    }, 10);
  });

  return (
    <Box color="text.primary">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={1}
      >
        {store.bars.map((bar, key) => {
          return (
            <Grid key={key} item>
              <div
                className="bar"
                style={{
                  color: '#fff',
                  backgroundColor: bar.isColored ? 'skyblue' : '#000',
                  height: bar.value * 5,
                  padding: 5,
                }}
              >
                {bar.value}
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default observer(Display);
