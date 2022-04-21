import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import { default as React } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter your quantity.')
      .min(1, 'Min value is 1.')
      .typeError('Please enter a number'),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Quantity" form={form} />

      <Button type="submit" variant="contained" color="primary" fullWidth size="large">
        Buy
      </Button>
    </form>
  );
}

export default AddToCartForm;
