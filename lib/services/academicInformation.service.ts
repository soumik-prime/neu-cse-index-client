import { AcademicInformationApi } from "../api/academicInformation.api";

const getAcademicBatchList = async () => {
  const result = await AcademicInformationApi.getBatchList();
  return result.data ?? null;
};

export const AcademicInformationService = {
  getAcademicBatchList,
};