import { PayloadRequest } from 'payload/types';

export const authorHook = (
  userSlug: string,
  updatedByFieldName: string
): any => {
  return async (args: { doc: any; req: PayloadRequest; operation: string }) => {
    if (args.operation === 'update' && args.req.user !== undefined) {
      args.doc[updatedByFieldName] = {
        relationTo: userSlug,
        value: args.req.user.id,
      };
    }

    return args.doc;
  };
};
