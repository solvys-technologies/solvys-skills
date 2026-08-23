import { RiImageAddLine } from "@create-ui/assets/icons"

import {
  Dropzone,
  DropzoneDescription,
  DropzoneHeader,
  DropzoneHeading,
  DropzoneIcon,
  DropzoneSeparator,
  DropzoneTitle,
  DropzoneTrigger,
} from "@/registry/ui/dropzone"

export default function DropzoneCustom() {
  return (
    <div className="w-full max-w-[400px]">
      <Dropzone multiple accept="image/*" maxSize={10 * 1024 * 1024}>
        <DropzoneHeader>
          <DropzoneIcon>
            <RiImageAddLine />
          </DropzoneIcon>
          <DropzoneHeading>
            <DropzoneTitle>Drop your images here</DropzoneTitle>
            <DropzoneDescription>
              <span>PNG, JPG or GIF, up to 10 MB</span>
            </DropzoneDescription>
          </DropzoneHeading>
        </DropzoneHeader>
        <DropzoneSeparator>or</DropzoneSeparator>
        <DropzoneTrigger variant="primary">Browse images</DropzoneTrigger>
      </Dropzone>
    </div>
  )
}
