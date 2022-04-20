import { Box, Button, TextField, Typography, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: theme.spacing(2),

    '& > span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  btn: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const INIT_PRICE = { salePrice_gte: 0, salePrice_lte: 0 };

function FilterByPrice({ onChange }) {
  const classes = useStyles();

  const [rangePrice, setRangePrice] = useState(INIT_PRICE);

  const handleChange = (e) => {
    const { value, name } = e.target;
    //NOTE get ...pre because we want to save salePrice_gte and salePrice_lte after each of them changed
    setRangePrice((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setRangePrice(INIT_PRICE);
  };

  const handleSubmit = () => {
    if ((rangePrice.salePrice_gte === 0 && rangePrice.salePrice_lte === 0) || rangePrice.salePrice_lte === 0) return;
    if (onChange) onChange(rangePrice);
    handleReset();
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">SELECT RANGE PRICE</Typography>
      <Box className={classes.range}>
        <TextField
          id="outlined-size-small"
          variant="outlined"
          size="small"
          type="number"
          name="salePrice_gte"
          value={rangePrice.salePrice_gte}
          onChange={handleChange}
        />
        <span>-</span>
        <TextField
          id="outlined-size-small"
          variant="outlined"
          size="small"
          type="number"
          name="salePrice_lte"
          value={rangePrice.salePrice_lte}
          onChange={handleChange}
        />
      </Box>
      <Box className={classes.btn}>
        <Button variant="contained" color="primary" size="small" onClick={handleSubmit}>
          Apply
        </Button>
        <Button variant="outlined" color="primary" size="small" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}

export default FilterByPrice;
