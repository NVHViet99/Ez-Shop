import { Box, Button, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
  const [rangePrice, setRangePrice] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    //NOTE get ...pre because we want to save salePrice_gte and salePrice_lte after each of them changed
    setRangePrice((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (onChange) onChange(rangePrice);
    setRangePrice({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };

  return (
    <Box>
      <Typography variant="subtitle2">PRICE</Typography>
      <Box>
        <TextField name="salePrice_gte" value={rangePrice.salePrice_gte} onChange={handleChange} />
        <TextField name="salePrice_lte" value={rangePrice.salePrice_lte} onChange={handleChange} />
      </Box>
      <Button variant="outlined" color="primary" onClick={handleSubmit}>
        Apply
      </Button>
    </Box>
  );
}

export default FilterByPrice;
