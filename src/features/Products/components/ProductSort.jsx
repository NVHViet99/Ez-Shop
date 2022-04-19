import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@material-ui/core";

ProductSort.propTypes = {
  currentValueSort: PropTypes.string.isRequired,
  onChangeSort: PropTypes.func,
};

function ProductSort({ currentValueSort, onChangeSort }) {
  const handleSortChange = (_, newValue) => {
    if (onChangeSort) {
      console.log(newValue);
      onChangeSort(newValue);
    }
  };

  return (
    <Tabs
      value={currentValueSort}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleSortChange}
      aria-label="disabled tabs example"
    >
      <Tab label="Price: High to Low" value="salePrice:DESC"></Tab>
      <Tab label="Price: Low to High" value="salePrice:ASC"></Tab>
    </Tabs>
  );
}

export default ProductSort;
