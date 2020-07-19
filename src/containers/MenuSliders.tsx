import React from 'react';
import { observer } from 'mobx-react-lite';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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

const MenuSliders: React.FC<{}> = () => {
  const classes = useStyles();
  const valueText = (val: number) => {
    return `${val}`;
  };
  const [speedVal, setSpeed] = React.useState<number>(50);
  const [elemVal, setElem] = React.useState<number>(5);

  const onSetSpeed = (event: any, newValue: number | number[]) => {
    setSpeed(newValue as number);
  };

  const onSetElem = (event: any, newValue: number | number[]) => {
    setElem(newValue as number);
  };

  return (
    <>
      <Grid item>
        <Typography id="discrete-slider" gutterBottom>
          Speed
        </Typography>
        <Slider
          className={classes.slider}
          defaultValue={50}
          getAriaValueText={valueText}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={10}
          marks
          min={10}
          max={100}
          onChange={onSetSpeed}
        />
      </Grid>
      <Grid item>
        <Typography id="discrete-slider" gutterBottom>
          Elements
        </Typography>
        <Slider
          className={classes.slider}
          defaultValue={25}
          getAriaValueText={valueText}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={5}
          marks
          min={5}
          max={50}
          onChange={onSetElem}
        />
      </Grid>
    </>
  );
};

export default observer(MenuSliders);
