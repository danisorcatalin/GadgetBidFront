import { UserRole } from './types/user';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import LaunchIcon from '@mui/icons-material/Launch';
import FeedIcon from '@mui/icons-material/Feed';
import SettingsIcon from '@mui/icons-material/Settings';
type Visibility = Array<UserRole | 'ANY'>;

interface SectionItem {
  title: string;
  path: string;
  icon: JSX.Element;
  visibility?: Visibility;
}
interface Section {
  title: string;
  items: SectionItem[];
  visibility: Visibility;
}

const sections: Section[] = [
  {
    title: 'General',
    visibility: ['ANY'],
    items: [
      {
        title: 'Overview',
        path: '/dashboard',
        icon: <VisibilityIcon fontSize="small" />,
        visibility: ['ANY'],
      },
    ],
  },
  {
    title: 'Workspace',
    visibility: ['ADMIN', 'ACCOUNT_MANAGER'],
    items: [
      {
        title: 'Issuers',
        path: '/dashboard/issuers-workspace',
        icon: <AccountBalanceIcon fontSize="small" />,
        visibility: ['ADMIN', 'ACCOUNT_MANAGER'],
      },
      {
        title: 'Investors',
        path: '/dashboard/investors-workspace',
        icon: <AttachMoneyIcon fontSize="small" />,
        visibility: ['ADMIN', 'ACCOUNT_MANAGER'],
      },
      {
        title: 'Campaigns',
        path: '/dashboard/campaigns-workspace',
        icon: <EmojiObjectsIcon fontSize="small" />,
        visibility: ['ADMIN', 'ACCOUNT_MANAGER'],
      },
      {
        title: 'Investments',
        path: '/dashboard/investments-workspace',
        icon: <TrendingUpIcon fontSize="small" />,
        visibility: ['ADMIN', 'ACCOUNT_MANAGER'],
      },
      {
        title: 'News Feed',
        path: '/dashboard/news-feed-workspace',
        icon: <FeedIcon fontSize="small" />,
        visibility: ['ADMIN', 'ACCOUNT_MANAGER'],
      },
    ],
  },
  {
    title: 'Crowdfunding',
    visibility: ['ISSUER'],
    items: [
      {
        title: 'Company profile',
        path: '/dashboard/company-profile',
        icon: <BusinessIcon fontSize="small" />,
        visibility: ['ISSUER'],
      },
      {
        title: 'Start a campaign',
        path: '/dashboard/crowdfunding-campaign',
        icon: <LaunchIcon fontSize="small" />,
        visibility: ['ISSUER'],
      },
      {
        title: 'News Feed',
        path: '/dashboard/news-feed',
        icon: <FeedIcon fontSize="small" />,
        visibility: ['ISSUER'],
      },
    ],
  },
  {
    title: 'Investing',
    visibility: ['INVESTOR'],
    items: [
      {
        title: 'My profile',
        path: '/dashboard/investor-profile',
        icon: <PersonIcon fontSize="small" />,
        visibility: ['INVESTOR'],
      },
      {
        title: 'My investments',
        path: '/dashboard/investor-investments',
        icon: <TrendingUpIcon fontSize="small" />,
        visibility: ['INVESTOR'],
      },
      {
        title: 'News Feed',
        path: '/dashboard/news-feed',
        icon: <FeedIcon fontSize="small" />,
        visibility: ['INVESTOR'],
      },
    ],
  },
  {
    title: 'My account',
    visibility: ['ANY'],
    items: [
      {
        title: 'Settings',
        path: '/dashboard/account',
        icon: <SettingsIcon fontSize="small" />,
        visibility: ['ANY'],
      },
    ],
  },
];

export const getSections = (userRole: UserRole): Section[] => {
  const filterByRole = (section: Section | SectionItem) =>
    section.visibility.includes(userRole) || section.visibility.includes('ANY');
  const filteredSections = sections.map((section) => {
    return {
      ...section,
      items: section.items.filter(filterByRole),
    };
  });
  return filteredSections.filter(filterByRole);
};
