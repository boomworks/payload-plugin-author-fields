import { PayloadRequest } from 'payload/types';

export const authorHook = (
  updatedByFieldName: string,
  userSlug: string
): any => {
  return async (args: {
    data: any;
    req: PayloadRequest;
    operation: string;
  }) => {
    if (
      args.operation === 'update' &&
      args.data !== undefined &&
      args.req.user !== undefined
    ) {
      args.data[updatedByFieldName] = {
        relationTo: userSlug,
        value: args.req.user.id,
      };
    }

    return args.data;
  };
};
