import React from 'react';
import { observer } from 'mobx-react-lite';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { StoreProps } from '../store/StoreProps';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slider: {
      width: 200,
    },
  }),
);

const MenuSliders: React.FC<StoreProps> = ({ store }) => {
  const classes = useStyles();
  const valueText = (val: number) => {
    return `${val}`;
  };

  const onSetSpeed = (event: any, newValue: number | number[]) => {
    store.speed = newValue as number;
  };

  const onSetElem = (event: any, newValue: number | number[]) => {
    store.elements = newValue as number;
    store.generateBars();
  };

  return (
    <>
      <Grid item>
        <Typography id="discrete-slider" gutterBottom>
          Speed
        </Typography>
        <Slider
          className={classes.slider}
          defaultValue={store.defaultSpeed}
          getAriaValueText={valueText}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={10}
          marks
          min={10}
          max={100}
          onChange={onSetSpeed}
          disabled={store.state !== 0 ? true : false}
        />
      </Grid>
      <Grid item>
        <Typography id="discrete-slider" gutterBottom>
          Elements
        </Typography>
        <Slider
          className={classes.slider}
          defaultValue={store.defaultElements}
          getAriaValueText={valueText}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={5}
          marks
          min={5}
          max={30}
          onChange={onSetElem}
          disabled={store.state !== 0 ? true : false}
        />
      </Grid>
    </>
  );
};

export default observer(MenuSliders);
