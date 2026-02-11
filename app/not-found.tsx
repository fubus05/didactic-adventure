export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-78px)] w-full flex flex-col justify-center items-center">
      <div
        className="flex flex-col justify-center items-center h-full w-full"
        style={{
          backgroundImage: "url('/bg-svg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "calc(100vh - 78px)",
        }}
      >
        <h2 className="text-gradient-gold w-fit md:text-[70px] text-[42px] text-center uppercase md:normal-case">
          Page not found
        </h2>
        <p className="text-[18px] md:text-[#D4D4D4] text-white text-center px-[19.5px] md:px-0">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>
    </main>
  );
}
