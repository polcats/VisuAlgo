import React from 'react';
import { observer } from 'mobx-react-lite';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';

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
  const onSetAlgo = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAlgo(event.target.value as string);
    console.log(event.target.value);
  };

  return (
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
  );
};

export default observer(MenuSelects);
