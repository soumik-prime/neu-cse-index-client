import { AcademicInformationApi } from "../api/academicInformation.api";
import { AcademicInformationSchema } from "../schemas/academicInformation.schema";

const getAcademicBatchList = async () => {
  return AcademicInformationSchema.academicBatchListApiResponseSchema.parse(
    await AcademicInformationApi.getBatchList()
  );
};

export const AcademicInformationService = {
  getAcademicBatchList,
};
