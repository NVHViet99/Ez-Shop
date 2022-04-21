import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from 'utils';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  name: {
    fontWeight: 'bold',
  },
  description: {
    margin: theme.spacing(2, 0),
  },
  priceBox: {
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.grey[200],
  },
  salePrice: {
    marginRight: theme.spacing(2),
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
  },
  originalPrice: {
    marginRight: theme.spacing(2),
    textDecoration: 'line-through',
  },
}));

ProductInfo.propTypes = {
  product: PropTypes.object,
};

function ProductInfo({ product }) {
  const classes = useStyles();

  const { name, originalPrice, promotionPercent, shortDescription, salePrice } = product;

  return (
    <Box className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.name}>
        {name}
      </Typography>
      <Typography className={classes.description} variant="body2">
        {shortDescription}
      </Typography>

      {promotionPercent > 0 && (
        <Box className={classes.priceBox}>
          <Box component="span" className={classes.salePrice}>
            {formatPrice(salePrice)}
          </Box>
          <Box component="span" className={classes.originalPrice}>
            {formatPrice(originalPrice)}
          </Box>
          <Box component="span">{` -${product.promotionPercent}%`}</Box>
        </Box>
      )}
      {!promotionPercent > 0 && (
        <Box className={classes.priceBox}>
          <Box component="span">{formatPrice(originalPrice)}</Box>
        </Box>
      )}
    </Box>
  );
}

export default ProductInfo;
