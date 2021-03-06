import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, makeStyles } from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import ProductSkeletonList from '../ProductSkeletonList';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.main,
      },
    },
  },
}));

function FilterByCategory({ onChange }) {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  const classes = useStyle();

  //NOTEs get all category list and only save id and name to state
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Faild to fetch category', error);
      }
      setLoading(false);
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) onChange({ 'category.id': category.id });
  };

  return (
    <>
      {loading ? (
        <ProductSkeletonList length={1} minHeight={'223.91px'} />
      ) : (
        <Box className={classes.root}>
          <Typography>PRODUCTS CATEGORY</Typography>
          <ul className={classes.menu}>
            {categoryList.map((category) => (
              <li key={category.id} onClick={() => handleCategoryClick(category)}>
                <Typography variant="body2">{category.name}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </>
  );
}

export default FilterByCategory;
