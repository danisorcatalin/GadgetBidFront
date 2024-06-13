import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@mui/material/styles';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import ErrorFallback from '../ErrorFallback';
import { DashboardPageInnerLayout } from './DashboardPageInnerLayout';
import { useEffect } from 'react';
import * as Sentry from '@sentry/react';

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayoutRoot = experimentalStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
}));

const DashboardLayout: FC<DashboardLayoutProps> = () => {
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/6127cd61649e0a0a5cd31ee2/1fe1nkhnq';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar onSidebarMobileOpen={(): void => setIsSidebarMobileOpen(true)} />
      <DashboardSidebar
        onMobileClose={(): void => setIsSidebarMobileOpen(false)}
        openMobile={isSidebarMobileOpen}
      />
      <Sentry.ErrorBoundary fallback={ErrorFallback}>
        <DashboardPageInnerLayout>
          <Outlet />
        </DashboardPageInnerLayout>
      </Sentry.ErrorBoundary>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
