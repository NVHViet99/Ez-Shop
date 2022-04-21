import { Paper } from '@material-ui/core';
import React from 'react';
import DOMPurify from 'dompurify';

function ProductDescription({ product = {} }) {
  const safeDescription = DOMPurify.sanitize(product.description);

  return (
    <Paper elevation={0} style={{ padding: '20px' }}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />;
    </Paper>
  );
}

export default ProductDescription;
