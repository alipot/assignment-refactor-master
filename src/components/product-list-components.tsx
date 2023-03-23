import * as React from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './product-list-components.module.css';
import { Product } from '../interfaces';

interface ProductDetailProps {
  index: number;
  product: Product;
  onFav: (prodIndex: number, isFavValue: boolean) => void;
}

const ProductDetailComponent: React.FC<{
  index: number;
  product: Product;
  onFav: (prodIndex: number, isFavValue: boolean) => void;
}> = ({ index, product, onFav }) => {
  const {
    product: productClass,
    productBody,
    actionBarItem,
    actionBarItemLabel,
  } = styles;
  // Problem: Now product title can be too long, I just put overflowX as fix now
  return (
    <span
      className={productClass}
      style={{
        display: 'inline-block',
        overflowX: 'scroll',
        float: 'none',
        clear: 'both',
      }}
    >
      <span className={styles['product-title']} style={{ overflowX: 'hidden' }}>
        {product.title}
      </span>

      <p>
        <strong>
          Rating: {product.rating ? `${product.rating.rate}/5` : ''}
        </strong>
      </p>

      <p>
        <b>Price: ${product.price}</b>
      </p>

      <p className={productBody}>
        <span>
          <b>Description:</b>
        </span>
        <br />
        {product.description}
      </p>

      <span
        className={styles['action_bar']}
        style={{ display: 'table', width: '100%' }}
      >
        <span
          className={`${actionBarItem} ${product.isFavorite ? 'active' : ''}`}
          role="button"
          onClick={() => {
            onFav(index, !product.isFavorite);
          }}
        >
          <FaStar />{' '}
          <span className={actionBarItemLabel}>
            {product.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </span>
        </span>
      </span>
    </span>
  );
};

const areSameProducts = (
  prevProps: ProductDetailProps,
  currProps: ProductDetailProps
): boolean => {
  return prevProps.product.isFavorite === currProps.product.isFavorite;
};

export const ProductDetail = React.memo(
  ProductDetailComponent,
  areSameProducts
);

interface IPostsProps {
  products: Product[];
  onFav: (prodIndex: number, isFavValue: boolean) => void;
}

const ProductsList: React.FC<IPostsProps> = ({ products, onFav }) => {
  return (
    <div>
      {products
        .slice()
        .reverse()
        .map((prod, index) => (
          <ProductDetail
            key={index}
            index={index}
            product={prod}
            onFav={onFav}
          />
        ))}
    </div>
  );
};

export default React.memo(ProductsList);
