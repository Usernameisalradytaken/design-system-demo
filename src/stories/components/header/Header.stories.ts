import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Header from "../../../components/header/Header.vue";

const meta = {
  title: "Components/Header",
  component: Header,
  args: {
    title: "Design System",
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomTitle: Story = {
  args: {
    title: "My Application",
  },
};
