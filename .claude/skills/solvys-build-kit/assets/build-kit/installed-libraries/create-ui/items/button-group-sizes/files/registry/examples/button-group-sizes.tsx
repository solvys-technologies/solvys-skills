import { ButtonGroup, ButtonGroupItem } from "@/registry/ui/button-group"

export default function ButtonGroupSizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup size="xs">
        <ButtonGroupItem>List</ButtonGroupItem>
        <ButtonGroupItem active>Grid</ButtonGroupItem>
        <ButtonGroupItem>Gallery</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup size="sm">
        <ButtonGroupItem>List</ButtonGroupItem>
        <ButtonGroupItem active>Grid</ButtonGroupItem>
        <ButtonGroupItem>Gallery</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup size="md">
        <ButtonGroupItem>List</ButtonGroupItem>
        <ButtonGroupItem active>Grid</ButtonGroupItem>
        <ButtonGroupItem>Gallery</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup size="lg">
        <ButtonGroupItem>List</ButtonGroupItem>
        <ButtonGroupItem active>Grid</ButtonGroupItem>
        <ButtonGroupItem>Gallery</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup size="xl">
        <ButtonGroupItem>List</ButtonGroupItem>
        <ButtonGroupItem active>Grid</ButtonGroupItem>
        <ButtonGroupItem>Gallery</ButtonGroupItem>
      </ButtonGroup>
    </div>
  )
}
