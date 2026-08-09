import { Meta, Canvas, Controls } from "@storybook/addon-docs/blocks";
import * as Stories from "./{%componentName%}.stories.ts";

<Meta of={Stories} />

# @design-system/{%componentDir%}

Add desc. here.

## Install

### Using yarn

`yarn add --registry=https://npm.edpl.us @design-system/{%componentDir%}`

## Usage

`import { {%vueFileName%} } from "@design-system/{%componentDir%}"`

**Note:** Please note that we assume that you have `@design-system/rds-theme-base` installed as a dependency to your vue-based project and have included `@design-system/rds-theme-base` in the `main.js` or main file of vue-based application.

<Canvas of={Stories.Primary} />

## Controls

<Controls of={Stories.Primary} />

## Slots

- `exampleSlot` - This is where you would list slots, their use, and any binded data.
