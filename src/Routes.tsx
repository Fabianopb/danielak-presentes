import { Route, Switch } from 'react-router-dom';
import ProductGrid from './containers/ProductGrid/ProductGrid';
import ProductDetail from './containers/ProductDetail/ProductDetail';
import AboutPage from './components/AboutPage/AboutPage';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';
import { parse } from 'papaparse';
import { useState } from 'react';
import { Product } from './data/products';

const url = 'https://danielak-products.s3.sa-east-1.amazonaws.com/produtos.csv';
const imageBaseUrl = 'https://danielak-products.s3.sa-east-1.amazonaws.com/products/';

const Routes = () => {
  const [products, setProducts] = useState<Product[]>([]);

  parse<Product>(url, {
    download: true,
    header: true,
    transform(value, field) {
      if (field === 'images') {
        return value.split('\n').map((image) => ({
          small: imageBaseUrl + image,
          large: imageBaseUrl + image,
        }));
      }
      if (field === 'description') {
        return value.replaceAll('\n', '<br />');
      }
      return value;
    },
    complete(results) {
      const productWithIds = results.data.map((product) => ({
        ...product,
        id: product.name.replace(/[^A-Z|a-z|\d]+/g, '-').toLowerCase(),
      }));
      setProducts(productWithIds);
    },
  });

  return (
    <Switch>
      <Route exact path="/" render={() => <ProductGrid products={products} />} />
      <Route exact path="/product/:id" render={() => <ProductDetail products={products} />} />
      <Route exact path="/about" component={AboutPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
