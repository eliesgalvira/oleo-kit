import { createSocialImage } from "../social-image"

export const dynamic = "force-static"

export function GET() {
  return createSocialImage()
}
