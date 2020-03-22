import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';

class Contact extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  };
  render() {
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Details </h4>
        <form>
          <input
            className={styles.Input}
            type='name'
            name='name'
            placeholder='Your name here'
          />
          <input
            className={styles.Input}
            type='email'
            name='email'
            placeholder='Your email'
          />
          <input
            className={styles.Input}
            type='text'
            name='street'
            placeholder='Your street'
          />
          <input
            className={styles.Input}
            type='text'
            name='postal'
            placeholder='Your postal code'
          />
          <Button btnType='Success'>ORDER</Button>
        </form>
      </div>
    );
  }
}

export default Contact;
