export function Video({ url, title }: { url: string; title: string }) {
  return (
    <div className="rounded-lg text-white bg-black">
      <video
        src={url}
        className="aspect-video w-full rounded-md object-cover border border-2 border-black"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="px-1 text-xl font-bold ">{title}</div>
    </div>
  );
}
