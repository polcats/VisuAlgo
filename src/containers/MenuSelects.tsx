import React from 'react';
import { observer } from 'mobx-react-lite';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

const MenuSelects: React.FC<{}> = () => {
  const classes = useStyles();
  const [algo, setAlgo] = React.useState('bubble');
  const [order, setOrder] = React.useState('asc');

  const onSetAlgo = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAlgo(event.target.value as string);
  };
  const onSetOrder = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOrder(event.target.value as string);
  };

  return (
    <>
      <Grid item>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="uncontrolled-native">Algorithm</InputLabel>
          <NativeSelect
            defaultValue={algo}
            inputProps={{
              name: 'name',
              id: 'uncontrolled-native',
            }}
            onChange={onSetAlgo}
          >
            <option value="bubble">Bubble Sort</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
          <FormHelperText>Select a sorting algorithm</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="uncontrolled-native">Order</InputLabel>
          <NativeSelect
            defaultValue={order}
            inputProps={{
              name: 'name',
              id: 'uncontrolled-native',
            }}
            onChange={onSetOrder}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </NativeSelect>
          <FormHelperText>Select a sorting order</FormHelperText>
        </FormControl>
      </Grid>
    </>
  );
};

export default observer(MenuSelects);
