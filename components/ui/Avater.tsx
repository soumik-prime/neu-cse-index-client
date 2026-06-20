import Image from "next/image";

export function initials(name = "") {
  return (
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?"
  );
}
export default function Avatar({
  name,
  photo,
  size = 36,
  bgClass = "bg-[#D1FAE5] text-[#02644A]",
}: {
  name: string;
  photo: string | null;
  size?: number;
  bgClass?: string;
}) {
  if (photo)
    return (
      <Image
        src={photo}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0"
      />
    );
  return (
    <div
      className={`rounded-full flex items-center justify-center shrink-0 font-semibold ${bgClass}`}
      style={{ width: size, height: size, fontSize: size * 0.32 }}
    >
      {initials(name)}
    </div>
  );
}
