import { Box, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

FilterbyService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  list: {
    padding: '0',
    margin: '0',
    listStyleType: 'none',
  },
}));

function FilterbyService({ filters = {}, onChange }) {
  const classes = useStyles();

  const handleChange = (e) => {
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">SERVICES</Typography>

      <ul className={classes.list}>
        {[
          { key: 'isPromotion', label: 'Discount' },
          { key: 'isFreeShip', label: 'FreeShip' },
        ].map((service) => (
          <li key={service.key}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.key])}
                  onChange={handleChange}
                  name={service.key}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterbyService;
