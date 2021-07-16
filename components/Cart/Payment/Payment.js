import React from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { STRIPE_TOKEN } from '../../../utils/constats';

const stripePromise = loadStripe(STRIPE_TOKEN);

const Payment = (props) => {
   const { products, address } = props;
   return (
      <div className='payment'>
         <div className='title'>Pago</div>
         <div className='data'>
            <Elements stripe={stripePromise}>
               <p>Formulario de pago</p>
            </Elements>
         </div>
      </div>
   );
};

export default Payment;
