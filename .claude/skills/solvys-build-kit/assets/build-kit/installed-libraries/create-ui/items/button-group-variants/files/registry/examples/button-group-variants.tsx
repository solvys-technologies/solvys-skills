import { ButtonGroup, ButtonGroupItem } from "@/registry/ui/button-group"

export default function ButtonGroupVariants() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup variant="primary">
        <ButtonGroupItem>List</ButtonGroupItem>
        <ButtonGroupItem active>Grid</ButtonGroupItem>
        <ButtonGroupItem>Gallery</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup variant="neutral">
        <ButtonGroupItem>List</ButtonGroupItem>
        <ButtonGroupItem active>Grid</ButtonGroupItem>
        <ButtonGroupItem>Gallery</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup variant="soft">
        <ButtonGroupItem>List</ButtonGroupItem>
        <ButtonGroupItem active>Grid</ButtonGroupItem>
        <ButtonGroupItem>Gallery</ButtonGroupItem>
      </ButtonGroup>
    </div>
  )
}
