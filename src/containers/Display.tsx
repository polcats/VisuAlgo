import React from 'react';
import { observer } from 'mobx-react-lite';
import MenuModel from '../models/MenuModel';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

type DisplayProps = {
  store: MenuModel;
};

const Display: React.FC<DisplayProps> = ({ store }) => {
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
                  backgroundColor: '#000',
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
