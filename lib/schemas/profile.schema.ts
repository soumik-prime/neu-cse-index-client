import * as z from "zod";

const GenderSchema = z.enum(["male", "female"]);

const BloodGroupSchema = z.enum([
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
]);

const SemesterSchema = z.enum([
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "graduated",
]);

const InstitutionTypeSchema = z.enum([
  "university",
  "college",
  "highSchool",
  "other",
]);

const DegreeSchema = z.enum(["masters", "phd", "postdoc", "other"]);

const AcademicSchema = z.object({
  batch: z.coerce.number(),
  semester: SemesterSchema,
  gradYear: z.coerce.number(),
});

const CountrySchema = z.object({
  iso2: z.string(),
  name: z.string(),
  flag: z.string(),
});

const AddressSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: CountrySchema,
});

const InstitutionSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: InstitutionTypeSchema,
  website: z.url().optional(),
  address: AddressSchema,
});

const HigherStudySchema = z.object({
  id: z.string(),
  profileId: z.string(),
  degree: DegreeSchema,
  fieldOfStudy: z.string(),
  institution: InstitutionSchema,
  startDate: z.string(),
  endDate: z.string(),
});

const FullProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  photo: z.url(),
  bio: z.string(),
  gender: GenderSchema,
  bloodGroup: BloodGroupSchema,
  session: z.string(),
  email: z.email().optional(),
  facebook: z.url().optional(),
  github: z.url().optional(),
  linkedin: z.url().optional(),
  googleScholar: z.url().optional(),
  portfolio: z.url().optional(),
  academic: AcademicSchema,
  presentAddress: AddressSchema.optional(),
  permanentAddress: AddressSchema.optional(),
  sscInstitution: InstitutionSchema.optional(),
  hscInstitution: InstitutionSchema.optional(),
  higherStudies: z.array(HigherStudySchema).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const StudentProfileCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  photo: z.url(),
  bio: z.string(),
  session: z.string(),
  email: z.email().nullable(),
  facebook: z.url().nullable(),
  github: z.url().nullable(),
  linkedin: z.url().nullable(),
  googleScholar: z.url().nullable(),
  portfolio: z.url().nullable(),
  academic: AcademicSchema,
  presnetAddress: AddressSchema,
  permanentAddress: AddressSchema,
});

const AlumniProfileCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  photo: z.url(),
  bio: z.string(),
  session: z.string(),
  email: z.email().nullable(),
  facebook: z.url().nullable(),
  github: z.url().nullable(),
  linkedin: z.url().nullable(),
  googleScholar: z.url().nullable(),
  portfolio: z.url().nullable(),
  academic: AcademicSchema,
  presentAddress: AddressSchema,
  permanentAddress: AddressSchema,
});

export const ProfileSchma = {
  GenderSchema,
  BloodGroupSchema,
  SemesterSchema,
  InstitutionTypeSchema,
  DegreeSchema,
  AcademicSchema,
  CountrySchema,
  AddressSchema,
  InstitutionSchema,
  HigherStudySchema,
  FullProfileSchema,
  StudentProfileCardSchema,
  AlumniProfileCardSchema,
};
