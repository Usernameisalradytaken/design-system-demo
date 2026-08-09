import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Button from "../../components/button/Button.vue";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    label: {
      name: "label",
      type: { name: "string", required: false },
      description: "label",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Click me" },
      },
      control: { type: "text" },
    },
    onClick: {
      name: "click",
      description: "Fired when clicked.",
      table: {
        category: "Events",
      },
    },
  },
  args: {
    label: "Click me",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
