export function Video({ url, title }: { url: string; title: string }) {
  return (
    <div className="rounded-lg bg-black p-1 text-white">
      <video
        src={url}
        className="aspect-video w-full rounded-md object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="px-1 pt-1 text-xl font-bold">{title}</div>
    </div>
  );
}
