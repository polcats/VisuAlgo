import React from 'react';
import { observer } from 'mobx-react-lite';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { StoreProps } from '../store/StoreProps';
import { Algorithms, SortOrder } from '../models/MenuModel';

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

const MenuSelects: React.FC<StoreProps> = ({ store }) => {
  const classes = useStyles();

  const onSetAlgo = (event: React.ChangeEvent<{ value: unknown }>) => {
    store.algorithm = event.target.value as Algorithms;
  };
  const onSetOrder = (event: React.ChangeEvent<{ value: unknown }>) => {
    store.order = event.target.value as SortOrder;
  };

  return (
    <>
      <Grid item>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="uncontrolled-native">Algorithm</InputLabel>
          <NativeSelect
            defaultValue={store.algorithm}
            inputProps={{
              name: 'name',
              id: 'uncontrolled-native',
            }}
            onChange={onSetAlgo}
            disabled={store.state !== 0 ? true : false}
          >
            {Object.keys(Algorithms).map((algo, key) => {
              return (
                <option key={key} value={algo}>
                  {`${algo} sort`}
                </option>
              );
            })}
          </NativeSelect>
          <FormHelperText>Select a sorting algorithm</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="uncontrolled-native">Order</InputLabel>
          <NativeSelect
            defaultValue={store.order}
            inputProps={{
              name: 'name',
              id: 'uncontrolled-native',
            }}
            onChange={onSetOrder}
            disabled={store.state !== 0 ? true : false}
          >
            {Object.keys(SortOrder).map((order, key) => {
              return (
                <option key={key} value={order}>
                  {order}
                </option>
              );
            })}
          </NativeSelect>
          <FormHelperText>Select a sorting order</FormHelperText>
        </FormControl>
      </Grid>
    </>
  );
};

export default observer(MenuSelects);
