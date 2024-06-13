import { Components } from 'lib/GadgetClientJava';

export const onboardDataMock: Components.Schemas.UserOnboardOutputDto = {
  id: 4,
  files: [
    {
      id: 1,
      // onboardId: 4,
      // userId: 1,
      type: 'IDENTITY',
      name: 'Gadget FE tree structure',
      description: null,
      fileExtension: 'pdf',
      mimeType: 'application/pdf',
      filePath:
        'https://google-bucket.gadgetbid.com/user/documents/af44d095-4dc4-4456-2f6d-d9d1dc75682b',
      size: 25347,
      // status: 'NEW',
      // createdAt: '2021-07-19T07:33:00.534Z',
      // updatedAt: '2021-07-19T07:33:00.534Z',
    },
  ],
  accountManager: null,
  status: 'NOT_VERIFIED',
  createdAt: '2021-07-17T07:13:22.620Z',
  updatedAt: '2021-07-19T07:27:14.000Z',
};
