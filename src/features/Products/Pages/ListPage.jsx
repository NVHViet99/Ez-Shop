import { Box, Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import queyryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
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
  // history is fixed
  const history = useHistory();
  // location is not fixed
  const location = useLocation();

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 9,
    page: 1,
    total: 10,
  });

  const queryParams = useMemo(() => {
    const params = queyryString.parse(location.search);

    return {
      ...params,
      _page: +params._page || 1,
      _limit: +params._limit || 9,
      _sort: params._sort || 'salePrice:DESC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
      // isPromotion: ['true', 'false'].includes(params.isPromotion) ? params.isPromotion === 'true' : undefined,
      // isFreeShip: ['true', 'false'].includes(params.isFreeShip) ? params.isFreeShip === 'true' : undefined,
    };
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        const response = await productsApi.getAll(queryParams);
        const { data, pagination } = response;
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  // get index of pagination
  const handlePageChange = (_, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queyryString.stringify(filters),
    });
  };

  // when onChangeSort has a new value this func executes and sets new filter for the filter state
  const handleSortChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    history.push({
      pathname: history.location.pathname,
      search: queyryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queyryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilter) => {
    history.push({
      pathname: history.location.pathname,
      search: queyryString.stringify(newFilter),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              {/* NOTE filter from parent pass to child by filters, child has event on onChange trigger parent execute */}
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0} className={classes.paper}>
              {/* onChangeSort: when it has new value it will be update to _sort and then
                currentValueSort is an active tab
              */}
              <ProductSort onChangeSort={handleSortChange} currentValueSort={queryParams._sort} />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />

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
