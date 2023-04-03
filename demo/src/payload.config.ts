import { buildConfig } from 'payload/config';
import { addAuthorFields } from '../../src/';
import path from 'path';
import Categories from './collections/Categories';
import Posts from './collections/Posts';
import Tags from './collections/Tags';
import Users from './collections/Users';
import Media from './collections/Media';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  plugins: [
    addAuthorFields({
      // Exclude some collections
      excludedCollections: ['users', 'tags'],

      // The 'Created By' field should be editable for posts
      createdByFieldEditable: (slug: string) => slug === 'posts',

      // Use a function to determine the 'Created By' label
      createdByLabel: (slug: string) => {
        if (slug === 'posts') {
          return { en: 'Posted By', es: 'Publicado por' };
        }

        return { en: 'Created By', es: 'Creado por' };
      },

      // Internationalisation of labels is also supported
      updatedByLabel: { en: 'Updated By', es: 'Actualizado por' },
    }),
  ],
  collections: [Categories, Posts, Tags, Users, Media],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
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
});
