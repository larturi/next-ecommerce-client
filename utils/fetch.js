import { getToken, hasExpiredToken } from '../api/token';

export const authFetch = async (url, params, logout) => {
   const token = getToken();

   if (!token) {
      // Usuario no logueado
      logout();
   } else {
      if (hasExpiredToken(token)) {
         // Token expirado
         logout();
      } else {
         // Token válido
         const paramsTemp = {
            ...params,
            headers: {
               ...params?.headers,
               Authorization: `Bearer ${token}`,
            },
         };

         try {
            const response = await fetch(url, paramsTemp);
            const result = await response.json();
            return result;
         } catch (error) {
            return error;
         }
      }
   }
};
