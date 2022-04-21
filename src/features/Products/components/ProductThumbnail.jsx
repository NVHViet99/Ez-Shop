import { Box } from '@material-ui/core';
import { THUMBNAIL_PLACEHOLDER, STATIC_HOST } from 'constants/index';
import React from 'react';

function ProductThumbnail({ product }) {
  const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : `${THUMBNAIL_PLACEHOLDER}`;
  return (
    <Box>
      <img src={thumbnailUrl} alt={product.name} width="100%"></img>
    </Box>
  );
}

export default ProductThumbnail;
