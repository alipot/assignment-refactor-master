import * as React from 'react';
import { Button } from './button';
import styles from './form.module.css';
import { Product } from '../interfaces';
import { useState } from 'react';

type IFormProps = {
  'on-submit': (payload: Product) => void;
};

export const Form: React.FC<IFormProps> = (props) => {
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const resetForm = (): void => {
    setTitle('');
    setPrice('');
    setDescription('');
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    if (!title) {
      alert('Your product needs a title');
      return;
    }

    if (!description || !price) {
      alert('Your product needs some content');
      return;
    }

    props['on-submit']({
      title,
      description,
      price: +price,
    });

    resetForm();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <span className={styles.label}>Product title: *</span>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title..."
        defaultValue=""
        className={styles.input}
      />

      <span className={styles.label}>Product details: *</span>

      <input
        value={price}
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price..."
        defaultValue=""
        className={styles.input}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Start typing product description here..."
        defaultValue=""
        className={styles.textarea}
      />

      <Button>Add a product</Button>
    </form>
  );
};
