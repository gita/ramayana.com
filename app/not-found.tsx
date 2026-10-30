import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-24 text-center">
      <p className="verse verse-lg" lang="awa">होइहि सोइ जो राम रचि राखा।</p>
      <h1 className="mt-6 font-serif text-[2rem] font-semibold">This page is not here</h1>
      <p className="mt-3 text-muted">It may have moved when the site was rebuilt. The whole Ramcharitmanas is a tap away.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/ramcharitmanas" className="press inline-flex h-12 items-center rounded-full bg-accent px-6 font-medium text-white">Open the Ramcharitmanas</Link>
        <Link href="/sunderkand" className="press inline-flex h-12 items-center rounded-full border border-border bg-surface px-6">Sunderkand</Link>
      </div>
    </div>
  );
}
