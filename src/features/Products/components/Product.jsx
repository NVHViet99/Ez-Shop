import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants/index';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

function Product({ product }) {
  const classes = useStyles();

  const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail.url}` : `${THUMBNAIL_PLACEHOLDER}`;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/products/${product.id}`);
  };

  return (
    <Box padding={1} onClick={handleClick} className={classes.root}>
      <Box padding={1} minHeight="240px">
        <img src={thumbnailUrl} alt={product.name} width="100%"></img>
      </Box>
      <Box paddingLeft={1}>
        <Typography variant="body2">{product.name}</Typography>
        <Typography variant="body2">
          <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(product.salePrice)}
          </Box>

          {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
        </Typography>
      </Box>
    </Box>
  );
}

export default Product;
