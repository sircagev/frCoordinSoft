import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, ArrowLeftRight, Settings, CircleUserRound } from "lucide-react";
import Sidebar, { SidebarItem, SidebarAccordion } from "./components/Sidebar";
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './configs/ProtectedRoute';
import { Navbar2 } from './components/Navbar';
import { AreasPage } from './pages/AreasPage';
import { SedeAreasPage } from './pages/SedeAreasPage';
import CentrosPage from './pages/CentrosPage';
import SedesPage from './pages/SedesPage';




// Lazy load the pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ResiduosPage = lazy(() => import('./pages/ResiduosPage'));
const MovimientosPage = lazy(() => import('./pages/MovimientosPage'));
const ActividadesPage = lazy(() => import('./pages/ActividadesPage'));
const UsuariosPage = lazy(() => import('./pages/UsuariosPage'));
const ElementosPage = lazy(() => import('./pages/ElementosPage'));

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/residuos" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <ResiduosPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/movimientos" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <MovimientosPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/actividades" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <ActividadesPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/usuarios" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <UsuariosPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/elementos" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <ElementosPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/areas" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <AreasPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />


<Route path="/sedeAreas" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <SedeAreasPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />


<Route path="/centros" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <CentrosPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />


        
<Route path="/sedes" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <SedesPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />


      </Routes>
      
    </BrowserRouter>
  );
};

const WithSidebar = ({ children }) => (
  <div className="flex">
    <Sidebar>
      <SidebarItem nav="/home" icon={<Home size={20} />} text="Home" />
      <SidebarItem nav="/movimientos" icon={<ArrowLeftRight size={20} />} text="Movimientos" />
      <SidebarItem nav="/elementos" icon={<Settings size={20} />} text="Elementos" />
      <SidebarItem nav="/elementos" icon={<Settings size={20} />} text="Areas" />
      <SidebarItem nav="/usuarios" icon={<CircleUserRound size={20} />} text="Usuarios" />

      <SidebarAccordion icon={<Settings size={20} />} text="Opciones">
        <SidebarItem nav="/areas" text="Areas" />
        <SidebarItem nav="/sedeAreas" text="Sedes Areas" />
        <SidebarItem nav="/centros" text="Centros" />
        <SidebarItem nav="/sedes" text="Sedes" />
      </SidebarAccordion>
    </Sidebar>
    <div className='w-full bg-white h-screen overflow-auto'>
      <Navbar2 />
      {children}
    </div>
  </div>
);
