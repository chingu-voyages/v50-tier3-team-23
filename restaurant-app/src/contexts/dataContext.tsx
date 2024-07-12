// import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';

// // Define the context value type
// interface DataContextType {
//   data: any[] | null;
//   loading: boolean;
//   error: Error | null;
// }

// const DataContext = createContext<DataContextType | undefined>(undefined);

// interface DataProviderProps {
//   children: ReactNode;
// }

// // Create the DataProvider component
// const DataProvider: FC<DataProviderProps> = ({ children }) => {
//   const [data, setData] = useState<any[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://menus-api.vercel.app/');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const result: any[] = await response.json();
//         setData(result);
//       } catch (error) {
//         setError(error as Error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <DataContext.Provider value={{ data, loading, error }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// export { DataContext, DataProvider };
