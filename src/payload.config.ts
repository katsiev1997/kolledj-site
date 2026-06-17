import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Applications } from './collections/Applications'
import { Campuses } from './collections/Campuses'
import { Documents } from './collections/Documents'
import { Events } from './collections/Events'
import { FAQ } from './collections/FAQ'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { Pages } from './collections/Pages'
import { Partners } from './collections/Partners'
import { Programs } from './collections/Programs'
import { Promotions } from './collections/Promotions'
import { Staff } from './collections/Staff'
import { Users } from './collections/Users'
import { Vacancies } from './collections/Vacancies'
import { Homepage } from './globals/Homepage'
import { LegalAccessibleEnvironment } from './globals/LegalAccessibleEnvironment'
import { LegalBasicInfo } from './globals/LegalBasicInfo'
import { LegalFinance } from './globals/LegalFinance'
import { LegalInternational } from './globals/LegalInternational'
import { LegalMTB } from './globals/LegalMTB'
import { LegalPaidServices } from './globals/LegalPaidServices'
import { LegalScholarships } from './globals/LegalScholarships'
import { LegalStandards } from './globals/LegalStandards'
import { LegalStructure } from './globals/LegalStructure'
import { PageContent } from './globals/PageContent'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Campuses,
    Programs,
    News,
    FAQ,
    Pages,
    Partners,
    Events,
    Promotions,
    Applications,
    Documents,
    Staff,
    Vacancies,
  ],
  globals: [
    SiteSettings,
    Homepage,
    PageContent,
    LegalBasicInfo,
    LegalStructure,
    LegalMTB,
    LegalAccessibleEnvironment,
    LegalInternational,
    LegalScholarships,
    LegalPaidServices,
    LegalFinance,
    LegalStandards,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
