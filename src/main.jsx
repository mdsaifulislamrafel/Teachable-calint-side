import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { router } from './Router/Router.jsx';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './Provider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from './Components/Loading/Loading.jsx';

const queryClient = new QueryClient();

// eslint-disable-next-line react-refresh/only-export-components
const RootComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // ২ সেকেন্ড পরে লোডিং বন্ধ হবে
    return () => clearTimeout(timer);
  }, []);
  return loading ? (
    <Loading /> 
  ) : (
    <QueryClientProvider client={queryClient}>
      <div className="w-full md:w-[98%] mx-auto">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
