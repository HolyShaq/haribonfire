import LogoSVG from "@/components/LogoSVG";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
          <LogoSVG className="size-24 text-primary animate-pulse mb-8" />
      <div className="mb-4">
        <span className="text-4xl font-bold">Welcome to the </span>
        <span className="text-4xl font-bold text-primary">Bonfire</span>
        <span className="text-4xl font-bold">!</span>
      </div>

      <div>
        <span className="text-lg font-bold">Chat with </span>
        <span className="text-lg font-bold text-primary">everybody</span>
        <span className="text-lg font-bold"> in the Bonfire Chat or...</span>
      </div>

      <div>
        <span className="text-lg font-bold">Chat with a </span>
        <span className="text-lg font-bold text-primary">stranger</span>
        <span className="text-lg font-bold"> in the Random Chat!</span>
      </div>
    </div>
  );
}
