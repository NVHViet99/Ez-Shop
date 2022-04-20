import { Box, Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import productsApi from '../../../api/productApi';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
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
    _sort: 'salePrice:DESC',
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
  // get index of pagination
  const handlePageChange = (_, page) => {
    setFilter((preFilters) => ({
      ...preFilters,
      _page: page,
    }));
  };

  // when onChangeSort has a new value this func executes and sets new filter for the filter state
  const handleSortChange = (newSortValue) => {
    setFilter((preFilters) => ({
      ...preFilters,
      _sort: newSortValue,
    }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilter((preFilters) => ({
      ...preFilters,
      // many filters
      ...newFilters,
    }));
  };

  const setNewFilters = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              {/* NOTE filter from parent pass to child by filters, child has event on onChange trigger parent execute */}
              <ProductFilters filters={filter} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0} className={classes.paper}>
              {/* onChangeSort: when it has new value it will be update to _sort and then
                currentValueSort is an active tab
              */}
              <ProductSort onChangeSort={handleSortChange} currentValueSort={filter._sort} />
              <FilterViewer filters={filter} onChange={setNewFilters} />

              {loading ? <ProductSkeletonList length={9} minHeight={'290px'} /> : <ProducList data={productList} />}

              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  // total page
                  count={Math.ceil(pagination.total / pagination.limit)}
                  // current page
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
