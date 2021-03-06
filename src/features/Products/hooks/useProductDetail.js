import productApi from 'api/productApi';
import { useEffect, useState } from 'react';

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const product = await productApi.get(productId);
        setProduct(product);
      } catch (error) {
        console.log('Fail to fetch product', error);
      }
      setLoading(false);
    })();
  }, [productId]);

  return { product, loading };
}
