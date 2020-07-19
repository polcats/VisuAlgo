import React from 'react';
import { observer } from 'mobx-react-lite';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
    },
    slider: {
      width: 200,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      width: 200,
    },
  }),
);

const valueText = (val: number) => {
  return `${val}`;
};

const Menu: React.FC<{}> = () => {
  const classes = useStyles();
  const [algo, setAlgo] = React.useState('bubble');
  const [order, setOrder] = React.useState('asc');

  const onSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAlgo(event.target.value as string);
  };

  const onSetOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrder((event.target as HTMLInputElement).value);
  };

  return (
    <Box color="text.primary">
      <Grid container spacing={3}>
        <Grid item xs>
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
          />

          <Typography id="discrete-slider" gutterBottom>
            Elements
          </Typography>
          <Slider
            className={classes.slider}
            defaultValue={5}
            getAriaValueText={valueText}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={5}
            marks
            min={5}
            max={25}
          />
        </Grid>
        <Grid item xs>
          <FormControl component="fieldset">
            <FormLabel component="legend">Order</FormLabel>
            <RadioGroup
              aria-label="Order"
              name="order"
              value={order}
              onChange={onSetOrder}
            >
              <FormControlLabel
                value="asc"
                control={<Radio color="primary" />}
                label="Ascending"
              />
              <FormControlLabel
                value="des"
                control={<Radio color="primary" />}
                label="Descending"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="uncontrolled-native">Algorithm</InputLabel>
            <NativeSelect
              defaultValue={algo}
              inputProps={{
                name: 'name',
                id: 'uncontrolled-native',
              }}
            >
              <option value="bubble">Bubble Sort</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
            <FormHelperText>Select a sorting algorithm</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default observer(Menu);
