import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import axios from '../../../axios-order';

class Contact extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = event => {
    console.log(this.props.ingredients);
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Saurabh Patel',
        address: {
          street: 'Test Street',
          pinCode: 421301,
          country: 'India'
        },
        email: 'test@mail.com'
      },
      deliveryMethod: 'fastest'
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
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
        <Button btnType='Success' onClicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Details </h4>
        {form}
      </div>
    );
  }
}

export default Contact;
