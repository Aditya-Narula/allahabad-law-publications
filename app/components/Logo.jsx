import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <Image
        src="/logo.png"
        alt="Allahabad Law Publications"
        width={56}
        height={56}
        className="object-contain"
      />

      <div>

        <h1 className="text-xl font-bold tracking-tight">
          Allahabad Law Publications
        </h1>

        <p className="text-sm text-gray-500">
          Trusted Legal Publisher Since 1959
        </p>

      </div>

    </Link>
  );
}