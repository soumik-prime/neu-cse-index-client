import type { AppData } from "../_types";

/** Replace each fetch() call here with your real Prisma / API queries. */
export async function getSeedData(): Promise<AppData> {
  return {
    role: "superadmin", // normally derived from session / JWT

    profile: {
      name: "Abdullah Al Shiam", reg: "NEU-CSE-19-001", bio: "Lecturer & CS enthusiast.",
      gender: "Male", blood: "B+",
      email: "shiam@neu.ac.bd", facebook: "", linkedin: "", github: "", scholar: "", portfolio: "",
      session: "2019-20", batch: "1st", semester: "8th", gradYear: "2023",
      ssc: "Netrokona Govt. High School", hsc: "Netrokona Govt. College", higherStudy: [],
      presentCity: "Dhaka", presentCountry: "Bangladesh",
      permCity: "Netrokona", permCountry: "Bangladesh",
      photo: null,
    },

    users: [
      { id: 1, name: "Rahim Uddin",   email: "rahim@neu.ac.bd",   reg: "NEU-CSE-20-001", session: "2020-21", batch: "2nd", semester: "7th", gradYear: "2024", visible: true,  photo: null },
      { id: 2, name: "Sumaiya Islam", email: "sumaiya@neu.ac.bd", reg: "NEU-CSE-21-001", session: "2021-22", batch: "3rd", semester: "5th", gradYear: "2025", visible: true,  photo: null },
      { id: 3, name: "Kawsar Ahmed",  email: "kawsar@neu.ac.bd",  reg: "NEU-CSE-22-001", session: "2022-23", batch: "4th", semester: "3rd", gradYear: "2026", visible: false, photo: null },
      { id: 4, name: "Nadia Akter",   email: "nadia@neu.ac.bd",   reg: "NEU-CSE-23-001", session: "2023-24", batch: "5th", semester: "1st", gradYear: "2027", visible: true,  photo: null },
    ],

    admins: [
      { id: 1, name: "Dr. Rezaul Karim",    email: "rezaul@neu.ac.bd", role: "admin",      photo: null },
      { id: 2, name: "Abdullah Al Shiam",   email: "shiam@neu.ac.bd",  role: "superadmin", photo: null },
    ],

    institutions: [
      { id: 1, name: "Netrokona University",     type: "University", website: "https://neu.ac.bd",  city: "Netrokona", country: "Bangladesh" },
      { id: 2, name: "BUET",                     type: "University", website: "https://buet.ac.bd", city: "Dhaka",     country: "Bangladesh" },
      { id: 3, name: "Netrokona Govt. College",  type: "College",    website: "",                   city: "Netrokona", country: "Bangladesh" },
    ],

    addresses: [
      { id: 1, city: "Dhaka",      country: "Bangladesh" },
      { id: 2, city: "Netrokona",  country: "Bangladesh" },
      { id: 3, city: "Chittagong", country: "Bangladesh" },
    ],

    academicBatches: [
      { id: 1, batch: "1st", semester: "8th", gradYear: "2023" },
      { id: 2, batch: "2nd", semester: "7th", gradYear: "2024" },
      { id: 3, batch: "3rd", semester: "5th", gradYear: "2025" },
      { id: 4, batch: "4th", semester: "3rd", gradYear: "2026" },
      { id: 5, batch: "5th", semester: "1st", gradYear: "2027" },
    ],
  };
}
