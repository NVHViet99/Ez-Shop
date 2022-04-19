import { Box, Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import productsApi from '../../../api/productApi';
import ProducList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';

const useStyles = makeStyles({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '10px',
  },
  paper: {
    marginBottom: '30px',
  },
});

function ListPage(props) {
  const classes = useStyles();

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 9,
    page: 1,
    total: 10,
  });
  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 9,
    _sort: 'salePrice:ASC',
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await productsApi.getAll(filter);
        const { data, pagination } = response;
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    })();
  }, [filter]);

  const handlePageChange = (_, page) => {
    setFilter((preFilters) => ({
      ...preFilters,
      _page: page,
    }));
  };

  const handleSortChange = (newSortValue) => {
    setFilter((preFilters) => ({
      ...preFilters,
      _sort: newSortValue,
    }));
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Left Column</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0} className={classes.paper}>
              <ProductSort onChangeSort={handleSortChange} currentValueSort={filter._sort} />
              {loading ? <ProductSkeletonList length={9} /> : <ProducList data={productList} />}
              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
