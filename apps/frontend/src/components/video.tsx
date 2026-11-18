export function Video({url,title}:{url:string,title:string}) {
    return <div className="p-2 rounded m-4 bg-black text-xl">
        <video src={url} className="h-[300px]" />
        <div>
            {title}
        </div>
    </div>
}