import * as React from 'react';
import _ from 'lodash';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { Button } from './components/button';
import ProductList from './components/product-list-components';
import { Form } from './components/form';
import logo from './images/droppe-logo.png';
import img1 from './images/img1.png';
import img2 from './images/img2.png';
import styles from './shopApp.module.css';
import { useEffect, useState } from 'react';

const ShopApp: React.FC<{}> = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShowingMessage, setIsShowingMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [numFavorites, setNumFavorites] = useState<number>(0);
  const [prodCount, setProdCount] = useState<number>(0);

  useEffect(() => {
    document.title = 'Droppe refactor app';
  }, []);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products').then((response) => {
      const jsonResponse = response.json();
      jsonResponse.then((rawData) => {
        setProducts([...rawData]);
        setProdCount(rawData.length);
      });
    });
  }, []);

  const favClick = (title: string): void => {
    const prods = _.cloneDeep(products);
    const prodIndex = _.findIndex(prods, { title: title });
    let currentFavs = numFavorites;
    let totalFavs: any;

    if (prods[prodIndex].isFavorite) {
      prods[prodIndex].isFavorite = false;
      totalFavs = --currentFavs;
    } else {
      totalFavs = ++currentFavs;
      prods[prodIndex].isFavorite = true;
    }
    setProducts(prods);
    setNumFavorites(totalFavs);
  };

  const onSubmit = (payload: {
    title: string;
    description: string;
    price: string;
  }): void => {
    const updated = [...products, payload];

    setProducts(updated);
    setProdCount(updated.length);
    setIsOpen(false);
    setIsShowingMessage(true);
    setMessage('Adding product...');

    // **this POST request doesn't actually post anything to any database**
    fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((json) => {
        (() => {
          setTimeout(() => {
            setIsShowingMessage(false);
            setMessage('');
          }, 2000);
        })();
      });
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={['container', styles.headerImageWrapper].join(' ')}>
          <img src={logo} className={styles.headerImage} alt="Droppe Logo" />
        </div>
      </div>

      <>
        <span
          className={['container', styles.main].join(' ')}
          style={{
            margin: '50px inherit',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <img
            src={img1}
            style={{ maxHeight: '15em', display: 'block' }}
            alt="Product Packing"
          />
          <img
            src={img2}
            style={{ maxHeight: '15rem', display: 'block' }}
            alt="Store Image"
          />
        </span>
      </>

      <div
        className={['container', styles.main].join(' ')}
        style={{ paddingTop: 0 }}
      >
        <div className={styles.buttonWrapper}>
          <span role="button">
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Send product proposal
            </Button>
          </span>
          {isShowingMessage && (
            <div className={styles.messageContainer}>
              <i>{message}</i>
            </div>
          )}
        </div>

        <div className={styles.statsContainer}>
          <span>Total products: {prodCount}</span>
          {' - '}
          <span>Number of favorites: {numFavorites}</span>
        </div>

        {products && !!products.length ? (
          <ProductList products={products} onFav={favClick} />
        ) : (
          <div></div>
        )}
      </div>

      <>
        <Modal
          isOpen={isOpen}
          className={styles.reactModalContent}
          overlayClassName={styles.reactModalOverlay}
        >
          <div className={styles.modalContentHelper}>
            <div
              className={styles.modalClose}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <FaTimes />
            </div>

            <Form on-submit={onSubmit} />
          </div>
        </Modal>
      </>
    </React.Fragment>
  );
};

export default ShopApp;
