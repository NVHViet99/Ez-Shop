import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterbyService from './Filters/FilterByService';

// NOTE when we have a new filter change so it notifies the parent through onChange() function
ProductFilters.propTypes = {
  //  current filters from parent
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  const handleCategoryChange = (newCategoryId) => {
    if (onChange) onChange(newCategoryId);
  };

  const handlePriceChange = (rangePrice) => {
    if (onChange) onChange(rangePrice);
  };

  const handleServiceChange = (rangePrice) => {
    if (onChange) onChange(rangePrice);
  };

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handlePriceChange} />
      <FilterbyService filters={filters} onChange={handleServiceChange} />
    </Box>
  );
}

export default ProductFilters;
