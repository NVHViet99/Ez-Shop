import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

ProductSkeletonList.propTypes = {
  length: PropTypes.number,
  minHeight: PropTypes.string,
};

// ProductSkeletonList.defaultProps = {
//   length: 10,
// };

function ProductSkeletonList({ length = 10, minHeight }) {
  return (
    <Box minHeight={minHeight}>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Box padding={1}>
              <Skeleton variant="rect" width="100%" />
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonList;
