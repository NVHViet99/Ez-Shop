import {
  Box,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},
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
  } = useRouteMatch();

  //NOTE pass productId to custom hook, it will be handle and return product and loading
  const { product, loading } = useProductDetail(productId);

  return (
    <Box>
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
              Right
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default DetailPage;
