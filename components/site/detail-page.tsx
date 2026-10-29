import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface DetailPageProps {
  backHref: string
  backLabel: string
  title: string
  description: string
  images: string[]
  meta?: React.ReactNode
}

export function DetailPage({ backHref, backLabel, title, description, images, meta }: DetailPageProps) {
  return (
    <article className="section">
      <div className="wrap max-w-4xl">
        <Link href={backHref} className="mb-8 inline-flex min-h-[3rem] items-center gap-2 font-bold text-accent hover:underline">
          <ArrowLeft className="h-5 w-5" aria-hidden="true" /> {backLabel}
        </Link>
        <h1 className="text-balance text-4xl font-bold md:text-5xl">{title}</h1>
        {meta && <div className="mt-5 space-y-2 text-lg">{meta}</div>}
        {images[0] && (
          <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-3xl bg-sand shadow-lg sm:aspect-[16/10]">
            <Image src={images[0]} alt={`Imagem de ${title}`} fill priority sizes="(min-width: 896px) 896px, 100vw" className="object-contain" />
          </div>
        )}
        {description && <p className="mt-8 whitespace-pre-line text-xl leading-relaxed">{description}</p>}
        {images.length > 1 && (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {images.slice(1).map((url, i) => (
              <li key={url} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
                <Image src={url} alt={`${title} — imagem ${i + 2}`} fill sizes="(min-width: 640px) 440px, 100vw" className="object-cover" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
