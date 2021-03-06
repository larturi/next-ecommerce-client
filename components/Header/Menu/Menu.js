/* eslint-disable @next/next/link-passhref */

import React, { useState, useEffect } from 'react';
import { Container, Menu, Grid, Icon, Label } from 'semantic-ui-react';
import Link from 'next/link';
import { map } from 'lodash';

import BasicModal from '../../Modal/BasicModal/BasicModal';
import Auth from '../../Auth';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import { getMeApi } from '../../../api/user';
import { getPlatformApi } from '../../../api/platform';

const MenuHeader = () => {
   const [showModal, setShowModal] = useState(false);
   const [titleModal, setTitleModal] = useState('Iniciar Sesión');
   const [user, setUser] = useState(undefined);
   const [platforms, setPlatforms] = useState([]);

   const { auth, logout } = useAuth();

   useEffect(() => {
      (async () => {
         const response = await getMeApi(logout);
         setUser(response);
      })();
   }, [auth, logout]);

   useEffect(() => {
      (async () => {
         const response = await getPlatformApi();
         setPlatforms(response || []);
      })();
   }, []);

   const onShowModal = () => setShowModal(true);
   const onCloseModal = () => setShowModal(false);

   return (
      <div className='menu'>
         <Container>
            <Grid>
               <Grid.Column className='menu__left' width={6}>
                  <MenuPlatforms platforms={platforms} />
               </Grid.Column>
               <Grid.Column className='menu__right' width={10}>
                  {user !== undefined && (
                     <MenuOptionsUser
                        onShowModal={onShowModal}
                        user={user}
                        logout={logout}
                     />
                  )}
               </Grid.Column>
            </Grid>
         </Container>
         <BasicModal
            show={showModal}
            setShow={setShowModal}
            title={titleModal}
            size='small'
         >
            <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
         </BasicModal>
      </div>
   );
};

const MenuPlatforms = (props) => {
   const { platforms } = props;
   return (
      <Menu>
         {map(platforms, (platform) => (
            <Link href={`/games/${platform.url}`} key={platform.id}>
               <Menu.Item as='a' name={platform.url}>
                  {platform.title}
               </Menu.Item>
            </Link>
         ))}
      </Menu>
   );
};

const MenuOptionsUser = (props) => {
   const { onShowModal, user, logout } = props;
   const { productsCartCounter } = useCart();

   return (
      <Menu>
         {user ? (
            <>
               <Link href='/orders'>
                  <Menu.Item as='a'>
                     <Icon name='game' />
                     <span className='menu-item-text'>Mis Pedidos</span>
                  </Menu.Item>
               </Link>

               <Link href='/whishlist'>
                  <Menu.Item as='a'>
                     <Icon name='heart outline' />
                     <span className='menu-item-text'>Wishlist</span>
                  </Menu.Item>
               </Link>

               <Link href='/account'>
                  <Menu.Item as='a'>
                     <Icon name='user outline' />
                     <span className='menu-item-text'>{user.name}</span>
                  </Menu.Item>
               </Link>

               <Link href='/cart'>
                  <Menu.Item as='a' className='m-0'>
                     <Icon name='cart' />
                     {productsCartCounter > 0 && (
                        <Label color='red' floating circular>
                           {productsCartCounter}
                        </Label>
                     )}
                  </Menu.Item>
               </Link>

               <Menu.Item className='m-0' onClick={logout}>
                  <Icon name='power off' />
               </Menu.Item>
            </>
         ) : (
            <Menu.Item onClick={onShowModal}>
               <Icon name='user outline' />
               <span className='miCuentaLabel'>Mi Cuenta</span>
            </Menu.Item>
         )}
      </Menu>
   );
};

export default MenuHeader;
