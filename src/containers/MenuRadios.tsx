import React from 'react';
import { observer } from 'mobx-react-lite';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const MenuRadios: React.FC<{}> = () => {
  const [order, setOrder] = React.useState('asc');
  const onSetOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrder((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Sorting Order</FormLabel>
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
  );
};

export default observer(MenuRadios);
