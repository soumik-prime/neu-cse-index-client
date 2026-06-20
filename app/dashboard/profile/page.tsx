import ProfileClient from "./ProfileClient";


const profileData = {
  photo: "",
  name: "Md. Samiul Islam Soumik",
  reg: "2020331045",
  bio: "Computer Science student at Netrokona University.",
  gender: "Male",
  blood: "B+",
};

export default function Page() {
  return <>
    <ProfileClient profile={{
      name: profileData.name,
      photo: profileData.photo,
      reg: profileData.reg,
      bio: profileData.bio,
      gender: profileData.gender,
      blood: profileData.blood
    }}/>
  </>
}