import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(4),
  },
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1',
    padding: theme.spacing(1.5),
  },
}));

function DetailPage() {
  const classes = useStyles();
  const {
    params: { productId },
    url,
  } = useRouteMatch();

  //NOTE pass productId to custom hook, it will be handle and return product and loading
  const { product, loading } = useProductDetail(productId);

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper>
          <Grid container>
            <Grid item className={classes.left}>
              {loading && (
                <Box sx={{ width: '100%' }}>
                  <LinearProgress />
                </Box>
              )}
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />

        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>
          <Route path={`${url}/additional`} component={ProductAdditional} />
          <Route path={`${url}/reviews`} component={ProductReviews} />
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
