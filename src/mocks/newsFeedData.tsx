import { Components } from 'lib/GadgetClientJava';
import { subMinutes } from 'date-fns';

const now = new Date();
export const newsFeedDataMock: Components.Schemas.NewNewsFeedDto[] = [
  {
    id: 1,
    user: null,
    createdAt: `${new Date(subMinutes(now, 16).getTime())}`,
    updatedAt: null,
    message: "Hey guys! What's your favorite framework?",
    status: 'ACCEPTED',
    postFiles: [],
  },
  {
    id: 2,
    user: null,
    createdAt: `${new Date(subMinutes(now, 16).getTime())}`,
    updatedAt: null,
    message: 'Just made this overview screen for a project, what-cha thinkin?',
    status: 'ACCEPTED',
    postFiles: [],
  },
  {
    id: 3,
    user: null,
    createdAt: `${new Date(subMinutes(now, 16).getTime())}`,
    updatedAt: null,
    message:
      'As a human being, you are designed in a way that makes you incapable of experiencing any positive emotion unless you set an aim and progress towards it. What makes you happy is not, in fact, attaining it, but making progress towards it.',
    status: 'HIDDEN',
    postFiles: [],
  },
];
