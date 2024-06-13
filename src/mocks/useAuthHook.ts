import { User } from 'types/user';

export const useAuthHook = (): Partial<User> => ({
  user: {
    id: 1,
    role: 'ISSUER',
    name: 'User',
  },
});
