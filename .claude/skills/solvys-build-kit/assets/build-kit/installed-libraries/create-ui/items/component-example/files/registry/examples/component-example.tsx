"use client"

import * as React from "react"
import {
  RiArrowRightLine,
  RiBankCardLine,
  RiCheckLine,
  RiLogoutBoxLine,
  RiMore2Line,
  RiSettingsLine,
  RiSparklingFill,
  RiUserLine,
} from "@create-ui/assets/icons"

import { Example, ExampleWrapper } from "@/registry/components/example"
import { Badge } from "@/registry/ui/badge"
import { Button, ButtonLabel } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"
import { Field, FieldGroup, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select"
import { Textarea } from "@/registry/ui/textarea"

export function ComponentExample() {
  return (
    <ExampleWrapper>
      <ComponentsExample />
      <FormExample />
    </ExampleWrapper>
  )
}

function ComponentsExample() {
  return (
    <Example title="Components" className="gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-strongest flex items-center gap-2 text-lg font-semibold">
          Welcome to Create UI
          <Badge variant="primary" leading={<RiSparklingFill />}>
            New
          </Badge>
        </div>
        <p className="text-body text-sm">
          Edit{" "}
          <code className="bg-weak rounded px-1 py-0.5 text-xs">
            component-example.tsx
          </code>{" "}
          to start building, then add more components with the CLI.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button>
          <ButtonLabel>Get started</ButtonLabel>
          <RiArrowRightLine />
        </Button>
        <Button variant="neutral-light" appearance="soft">
          Docs
        </Button>
        <Badge variant="success" leading={<RiCheckLine />}>
          Verified
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="primary" appearance="outline">
          Outline
        </Button>
        <Button variant="neutral-light" appearance="ghost">
          Ghost
        </Button>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="primary" iconOnly aria-label="Sparkle">
          <RiSparklingFill />
        </Badge>
      </div>
    </Example>
  )
}

function FormExample() {
  return (
    <Example title="Form">
      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="text-strongest text-base font-semibold">
            User information
          </div>
          <p className="text-body text-sm">Please fill in your details below</p>
        </div>
        <Dropdown>
          <Button
            variant="neutral-light"
            appearance="ghost"
            size="sm"
            iconOnly
            aria-label="More options"
          >
            <RiMore2Line />
          </Button>
          <Dropdown.Popover className="w-48" placement="bottom end">
            <Dropdown.Menu aria-label="Account">
              <Dropdown.Section>
                <Dropdown.Header>Account</Dropdown.Header>
                <Dropdown.Item id="profile" textValue="Profile">
                  <Dropdown.ItemContainer>
                    <RiUserLine />
                    <Dropdown.ItemLabel>Profile</Dropdown.ItemLabel>
                  </Dropdown.ItemContainer>
                </Dropdown.Item>
                <Dropdown.Item id="billing" textValue="Billing">
                  <Dropdown.ItemContainer>
                    <RiBankCardLine />
                    <Dropdown.ItemLabel>Billing</Dropdown.ItemLabel>
                  </Dropdown.ItemContainer>
                </Dropdown.Item>
                <Dropdown.Item id="settings" textValue="Settings">
                  <Dropdown.ItemContainer>
                    <RiSettingsLine />
                    <Dropdown.ItemLabel>Settings</Dropdown.ItemLabel>
                  </Dropdown.ItemContainer>
                </Dropdown.Item>
              </Dropdown.Section>
              <Dropdown.Separator />
              <Dropdown.Item id="signout" textValue="Sign out">
                <Dropdown.ItemContainer>
                  <RiLogoutBoxLine />
                  <Dropdown.ItemLabel>Sign out</Dropdown.ItemLabel>
                </Dropdown.ItemContainer>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>

      <form className="w-full">
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="example-name">Name</FieldLabel>
              <Input id="example-name" placeholder="Enter your name" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="example-role">Role</FieldLabel>
              <Select defaultValue={null}>
                <SelectTrigger id="example-role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="example-comments">Comments</FieldLabel>
            <Textarea
              id="example-comments"
              placeholder="Add any additional comments"
            />
          </Field>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="neutral-light" appearance="soft" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </Example>
  )
}
