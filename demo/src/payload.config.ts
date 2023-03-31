import { Config, buildConfig } from 'payload/config';
import { addAuthorFields } from '../../src/';
import path from 'path';
import Categories from './collections/Categories';
import Posts from './collections/Posts';
import Tags from './collections/Tags';
import Users from './collections/Users';
import Media from './collections/Media';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
    webpack: (config) => {
      const newConfig = {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            react: path.join(__dirname, '../node_modules/react'),
            'react-dom': path.join(__dirname, '../node_modules/react-dom'),
            payload: path.join(__dirname, '../node_modules/payload'),
          },
        },
      };

      return newConfig;
    },
  },
  plugins: [
    addAuthorFields({
      createdByFieldEditable: (slug: string) => {
        return slug === 'posts';
      },
      createdByLabel: (slug: string) => {
        if (slug === 'posts') {
          return 'Posted By';
        }

        return 'Created By';
      },
    }),
  ],
  collections: [Categories, Posts, Tags, Users, Media],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
