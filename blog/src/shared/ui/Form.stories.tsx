import { Form } from "./Form";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta<typeof Form> = {
  title: "shared/Form",
  component: Form
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => (
    <div className="rounded-md bg-secondary p-4">
      <h1 className="mb-2">Form Component</h1>
      <Form>
        <Form.Container>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Input type="email" id="email" />
        </Form.Container>
        <Form.Container>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Input type="password" id="password" />
        </Form.Container>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form>
    </div>
  )
};
