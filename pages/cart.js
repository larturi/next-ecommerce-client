import React, { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { getGameByUrlApi } from '../api/game';
import SummaryCart from '../components/Cart/SummaryCart';
import AddressShipping from '../components/Cart/AddressShipping';
import useCart from '../hooks/useCart';
import Payment from '../components/Cart/Payment';

const Cart = () => {
   const { getProductsCart } = useCart();
   const products = getProductsCart();
   return !products ? <EmptyCart /> : <FullCart products={products} />;
};

export default Cart;

const EmptyCart = () => {
   return (
      <BasicLayout className='empty-cart'>
         <h2>No hay productos en el carrito</h2>
      </BasicLayout>
   );
};

const FullCart = ({ products }) => {
   const [productsData, setProductsData] = useState(null);
   const [address, setAddress] = useState(null);

   useEffect(() => {
      (async () => {
         const productsTemp = [];
         for await (const product of products) {
            const data = await getGameByUrlApi(product);
            productsTemp.push(data);
         }
         setProductsData(productsTemp);
      })();
   }, [products]);

   return (
      <BasicLayout>
         <SummaryCart products={productsData} />
         <AddressShipping setAddress={setAddress} />
         {address && <Payment products={productsData} address={address} />}
      </BasicLayout>
   );
};
