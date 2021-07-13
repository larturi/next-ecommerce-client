import React, { useState, useEffect } from 'react';
import { Grid, Image, Icon, Button } from 'semantic-ui-react';
import { size } from 'lodash';
const HeaderGame = (props) => {
   const { game } = props;
   const { poster, title } = game;

   return (
      <Grid className='header-game'>
         <Grid.Column mobile={16} tablet={6} computer={5}>
            <Image src={poster.url} alt={title} fluid />
         </Grid.Column>

         <Grid.Column mobile={16} tablet={10} computer={11}>
            <InfoGame game={game} />
         </Grid.Column>
      </Grid>
   );
};

export default HeaderGame;

const InfoGame = (props) => {
   const { game } = props;
   const { title, summary, price, discount } = game;

   return (
      <>
         <div className='header-game__title'>
            {title}
            <Icon name='heart outline' className='' link />
         </div>

         <div className='header-game__delivery'>Entrega en 48h</div>

         <div
            className='header-game__summary'
            dangerouslySetInnerHTML={{ __html: summary }}
         />

         <div className='header-game__buy'>
            <div className='header-game__buy-price'>
               <p>Precio de venta al público: {price} $</p>
               <div className='header-game__buy-price-actions'>
                  <p>-{discount}%</p>
                  <p>{price - Math.floor(price * discount) / 100}$</p>
               </div>
            </div>
            <Button className='header-game__buy-btn'>Comprar</Button>
         </div>
      </>
   );
};