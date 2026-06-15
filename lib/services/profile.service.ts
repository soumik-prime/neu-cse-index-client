import { ProfileApi } from "@/lib/api/profile.api";
const getStudentProfiles = async (
    searchParams: Record<string, string | string[] | undefined>
) => {
    const semesterMap: Record<string, string> = {
        "1st": "FIRST_FIRST",
        "2nd": "FIRST_SECOND",
        "3rd": "SECOND_FIRST",
        "4th": "SECOND_SECOND",
        "5th": "THIRD_FIRST",
        "6th": "THIRD_SECOND",
        "7th": "FOURTH_FIRST",
        "8th": "FOURTH_SECOND",
    };

    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
        if (typeof value === "string") {
            params.set(key, value);
        }
    });

    const semester = params.get("semester");

    if (semester && semesterMap[semester]) {
        params.set("semester", semesterMap[semester]);
    }

    params.set("status", "current");

    return ProfileApi.getProfiles(params);
};
const getAlumniProfiles = async (
    searchParams: Record<string, string | string[] | undefined>
) => {
    const semesterMap: Record<string, string> = {
        "1st": "FIRST_FIRST",
        "2nd": "FIRST_SECOND",
        "3rd": "SECOND_FIRST",
        "4th": "SECOND_SECOND",
        "5th": "THIRD_FIRST",
        "6th": "THIRD_SECOND",
        "7th": "FOURTH_FIRST",
        "8th": "FOURTH_SECOND",
    };

    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
        if (typeof value === "string") {
            params.set(key, value);
        }
    });

    const semester = params.get("semester");

    if (semester && semesterMap[semester]) {
        params.set("semester", semesterMap[semester]);
    }

    params.set("status", "alumni");

    return ProfileApi.getProfiles(params);
};
export const ProfileService = {
    getStudentProfiles,
    getAlumniProfiles
};