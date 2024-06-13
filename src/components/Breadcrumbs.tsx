import { Breadcrumbs as MuiBreadcrumbs, Link } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import ChevronRightIcon from '../icons/ChevronRight';
import { getRouteName } from '../routes';

const computeRoute = (currentPath, paths) => {
  const currentPathIndex = paths.findIndex((path) => path === currentPath);
  const pathsSlice = paths.slice(0, currentPathIndex + 1);
  return pathsSlice.reduce((result, path) => {
    if (path === '/') return ``;
    return `${result}/${path}`;
  }, '');
};

export const Breadcrumbs = (): JSX.Element => {
  const { pathname } = useLocation();
  const paths = pathname.split('/').filter((p) => p);
  if (paths.length === 1) return null;
  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      separator={<ChevronRightIcon fontSize="small" />}
      sx={{ mt: 1 }}
    >
      {paths.map((path, index) => {
        const route = computeRoute(path, paths);
        if (!getRouteName(route)) return null;
        return (
          <Link
            color="textPrimary"
            component={RouterLink}
            to={route}
            variant="subtitle2"
            key={`breadcrumbs.${index}`}
          >
            {getRouteName(route)}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};
