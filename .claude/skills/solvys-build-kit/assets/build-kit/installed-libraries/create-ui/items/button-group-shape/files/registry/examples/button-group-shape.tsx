import { ButtonGroup, ButtonGroupItem } from "@/registry/ui/button-group"

export default function ButtonGroupShape() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup shape="rounded">
        <ButtonGroupItem>List</ButtonGroupItem>
        <ButtonGroupItem active>Grid</ButtonGroupItem>
        <ButtonGroupItem>Gallery</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup shape="pill">
        <ButtonGroupItem>List</ButtonGroupItem>
        <ButtonGroupItem active>Grid</ButtonGroupItem>
        <ButtonGroupItem>Gallery</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup shape="square">
        <ButtonGroupItem>List</ButtonGroupItem>
        <ButtonGroupItem active>Grid</ButtonGroupItem>
        <ButtonGroupItem>Gallery</ButtonGroupItem>
      </ButtonGroup>
    </div>
  )
}
