/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loader } from 'semantic-ui-react';
import { size } from 'lodash';
import BasicLayout from '../../layouts/BasicLayout';
import { getPlatformApi } from '../../api/platform';
import { getGamesPlatformApi, getTotalGamesPlatformApi } from '../../api/game';
import Games from '../../components/Games';
import Pagination from '../../components/Pagination';
import Seo from '../../components/Seo';

const limitPerPage = 5;

const Platform = () => {
   const { query } = useRouter();
   const [games, setGames] = useState(null);
   const [totalGamesPlatform, setTotalGamesPlatform] = useState(null);

   const getStartItem = () => {
      const currentPage = parseInt(query.page);
      if (!query.page || currentPage === 1) {
         return 0;
      } else {
         return currentPage * limitPerPage - limitPerPage;
      }
   };

   useEffect(() => {
      (async () => {
         if (query.platform) {
            const games = await getGamesPlatformApi(
               query.platform,
               limitPerPage,
               getStartItem()
            );
            if (size(games) > 0) {
               setGames(games);
            } else {
               setGames([]);
            }
         }
      })();
   }, [query]);

   useEffect(() => {
      (async () => {
         const countGamesPlatform = await getTotalGamesPlatformApi(
            query.platform
         );
         setTotalGamesPlatform(countGamesPlatform);
      })();
   }, [query.platform]);

   return (
      <BasicLayout className='platform'>
         <Seo title={`Juegos de ${query.platform}`} />
         {!games && <Loader active>Cargando...</Loader>}
         {games && size(games) === 0 && <h3>No hay Juegos</h3>}
         {size(games) > 0 && <Games games={games} />}

         {totalGamesPlatform && (
            <Pagination
               totalGames={totalGamesPlatform}
               page={parseInt(query.page) || 1}
               limitPerPage={limitPerPage}
            />
         )}
      </BasicLayout>
   );
};

export default Platform;

export const getStaticPaths = async () => {
   const platforms = await getPlatformApi();

   const paths = platforms.map((platform) => ({
      params: { platform: platform.url },
   }));

   return {
      paths,
      fallback: false,
   };
};

export const getStaticProps = async (context) => {
   const platformId = context.params?.id || '';
   const platform = { id: platformId };
   return { props: { platform } };
};
