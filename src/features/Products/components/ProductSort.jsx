import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
  currentValueSort: PropTypes.string.isRequired,
  onChangeSort: PropTypes.func,
};

function ProductSort({ currentValueSort, onChangeSort }) {
  //  có thay đổi báo lên parent
  const handleSortChange = (_, newValue) => {
    if (onChangeSort) {
      onChangeSort(newValue);
    }
  };

  return (
    <Tabs
      // currentValueSort: is an active tab
      value={currentValueSort}
      indicatorColor="primary"
      textColor="primary"
      //NOTE neu co onChange thi handleSortChange and save newValue to onChangeSort
      onChange={handleSortChange}
      aria-label="disabled tabs example"
    >
      <Tab label="Price: High to Low" value="salePrice:DESC"></Tab>
      <Tab label="Price: Low to High" value="salePrice:ASC"></Tab>
    </Tabs>
  );
}

export default ProductSort;
