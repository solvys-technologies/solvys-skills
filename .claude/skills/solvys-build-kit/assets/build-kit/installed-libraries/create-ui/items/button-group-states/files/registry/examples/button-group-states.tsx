import { ButtonGroup, ButtonGroupItem } from "@/registry/ui/button-group"

export default function ButtonGroupStates() {
  return (
    <ButtonGroup>
      <ButtonGroupItem>Default</ButtonGroupItem>
      <ButtonGroupItem active>Active</ButtonGroupItem>
      <ButtonGroupItem loading>Loading</ButtonGroupItem>
      <ButtonGroupItem disabled>Disabled</ButtonGroupItem>
    </ButtonGroup>
  )
}
