import type { Meta, StoryObj } from "@storybook/vue3-vite";
import {%componentName%} from "../../../components/{%componentDir%}/{%componentName%}.vue";
import SBConstants from "../../../../tools/documentation/sb-constants";

const meta: Meta<typeof {%componentName%}> = {
title:"{%componentType%}/{%componentName%}",
argTypes: {
title: {
name: "title",
type: { name: "string", required: true },
description: "describes the title of the component.",
table: {
type: { summary: "String" },
defaultValue: { summary: "null" },
},
control: { type: "text" },
},
titleVariant: {
name: "title-variant",
type: { name: "string", required: false },
description: "describes the variant of the title.",
table: {
type: { summary: "String" },
defaultValue: { summary: "rds-dark-3" },
},
control: { type: "select" },
options: Object.values(SBConstants.variantOptions),
}
},
args:{
title: "Lorem Ipsum"
}
}

export default meta;
type Story = StoryObj<typeof {%componentName%}>;

export const Primary: Story = {
render: (args) => ({
components: { "{%componentDir%}": {%componentName%} },
setup() {
return { args };
},
template: '<{%componentDir%} v-bind="args" />',
}),
};
