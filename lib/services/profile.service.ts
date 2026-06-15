import { ProfileApi } from "@/lib/api/profile.api";

const getAllProfiles = async (searchParams: URLSearchParams) => {
    try {
        const response = await ProfileApi.getProfiles(searchParams);
        return response;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}

export const ProfileService = {
    getAllProfiles,
};