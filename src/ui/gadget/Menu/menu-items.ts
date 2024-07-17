import { UserRole } from 'types/user';

type Visibility = Array<UserRole | 'ANY'>;

interface SectionItem {
  title: string;
  path: string;
  visibility?: Visibility;
}
interface Section {
  title: string;
  items: SectionItem[];
  visibility: Visibility;
}

interface UserRoleItems {
  ADMIN: UserRoleMenuItems;
  USER: UserRoleMenuItems;
}

interface UserRoleMenuItems {
  primary: SectionItem;
  infoText: string;
  secondary: SectionItem[];
}

const items: UserRoleItems = {
  ADMIN: {
    primary: {
      title: 'Overview',
      path: '/dashboard',
    },
    infoText: 'Workspace',
    secondary: [
      {
        title: 'Issuers',
        path: '/dashboard/issuers-workspace',
      },
      {
        title: 'Investors',
        path: '/dashboard/investors-workspace',
      },
      {
        title: 'Campaigns',
        path: '/dashboard/campaigns-workspace',
      },
      {
        title: 'Investments',
        path: '/dashboard/investments-workspace',
      },
    ],
  },
  USER: {
    primary: {
      title: 'Overview',
      path: '/dashboard',
    },
    infoText: 'Investing',
    secondary: [
      {
        title: 'My profile',
        path: '/dashboard/investor-profile',
      },
      {
        title: 'My investments',
        path: '/dashboard/investor-investments',
      },
    ],
  }
};

export const getMenuItems = (userRole: UserRole): UserRoleMenuItems => items[userRole];

const sections: Section[] = [
  {
    title: 'General',
    visibility: ['ANY'],
    items: [
      {
        title: 'Overview',
        path: '/dashboard',
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
        visibility: ['ADMIN', 'ACCOUNT_MANAGER'],
      },
      {
        title: 'Investors',
        path: '/dashboard/investors-workspace',
        visibility: ['ADMIN', 'ACCOUNT_MANAGER'],
      },
      {
        title: 'Campaigns',
        path: '/dashboard/campaigns-workspace',
        visibility: ['ADMIN', 'ACCOUNT_MANAGER'],
      },
      {
        title: 'Investments',
        path: '/dashboard/investments-workspace',
        visibility: ['ADMIN', 'ACCOUNT_MANAGER'],
      },
      {
        title: 'News Feed',
        path: '/dashboard/news-feed-workspace',
        visibility: ['ADMIN', 'ACCOUNT_MANAGER'],
      },
    ],
  },
  {
    title: 'Crowdfunding',
    visibility: ['USER'],
    items: [
      {
        title: 'Company profile',
        path: '/dashboard/company-profile',
        visibility: ['USER'],
      },
      {
        title: 'Start a campaign',
        path: '/dashboard/crowdfunding-campaign',
        visibility: ['USER'],
      },
      {
        title: 'News Feed',
        path: '/dashboard/news-feed',
        visibility: ['USER'],
      },
    ],
  }
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
