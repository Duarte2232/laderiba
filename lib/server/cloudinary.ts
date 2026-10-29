import "server-only"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }

// https://res.cloudinary.com/<cloud>/<image|raw|video>/upload/v123/<public_id>[.ext]
export function parseCloudinaryUrl(url: string): { publicId: string; resourceType: "image" | "raw" | "video" } | null {
  try {
    const parts = new URL(url).pathname.split("/")
    const uploadIndex = parts.indexOf("upload")
    if (uploadIndex < 2) return null
    const resourceType = parts[uploadIndex - 1] as "image" | "raw" | "video"
    if (!["image", "raw", "video"].includes(resourceType)) return null
    const rest = parts.slice(uploadIndex + 1)
    if (/^v\d+$/.test(rest[0] ?? "")) rest.shift()
    let publicId = decodeURIComponent(rest.join("/"))
    // Ficheiros "raw" mantêm a extensão no public_id; os restantes não.
    if (resourceType !== "raw") publicId = publicId.replace(/\.[^/.]+$/, "")
    return publicId ? { publicId, resourceType } : null
  } catch {
    return null
  }
}

export async function deleteCloudinaryUrl(url: string): Promise<void> {
  const parsed = parseCloudinaryUrl(url)
  if (!parsed) return
  await cloudinary.uploader.destroy(parsed.publicId, { resource_type: parsed.resourceType })
}
