import inquirer from "inquirer";
import { camelCase, upperFirst, kebabCase } from "lodash-es";
import { readdirSync, readFileSync, mkdir, writeFileSync } from "fs";
import { resolve } from "path";
import { exec } from "child_process";

const { prompt } = inquirer;

// string constants
const BASE_PATH_TEMPLATES = "./tools/new-component/templates";
const BASE_PATH_COMPONENTS = "./src/components";
const BASE_PATH_STORIES = "./src/stories";

const componentTypes = ["Components", "Sections"];

const questions = [
  {
    type: "input",
    name: "component_name",
    message: "Please enter the component name: ",
    validate: function (value) {
      // check for valid name
      if (value === "") {
        return "Component name cannot be empty!";
      }

      // check for existing component
      const existingComponentList = readdirSync("./src/components");
      const name = kebabCase(value);

      const result = existingComponentList.filter((component) => {
        return component === name;
      });

      if (result.length > 0) {
        return `Component with '${value}' name already exists, Please try another name!`;
      }

      return true;
    },
  },
  {
    type: "select",
    name: "component_type",
    message: "Please select the component type: ",
    choices: componentTypes,
  },
  {
    type: "input",
    name: "author_name",
    message: "Please enter your full name: ",
    validate: function (value) {
      if (value === "") {
        return "Author name cannot be empty!";
      }

      return true;
    },
  },
  {
    type: "input",
    name: "author_email",
    message: "Please enter your email: ",
    validate: function (value) {
      if (value === "") {
        return "Author email cannot be empty!";
      }

      // valid email address check
      var pass = value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
      if (!pass) {
        return "You have entered an invalid email address!";
      }

      return true;
    },
  },
];

prompt(questions).then((answers) => {
  const camelCaseText = camelCase(answers["component_name"]);
  const componentName = upperFirst(camelCaseText);
  const directoryName = kebabCase(answers["component_name"]);
  const authorName = upperFirst(answers["author_name"]);
  const authorEmail = upperFirst(answers["author_email"]);

  const licenseTemplate = readFileSync(resolve(`${BASE_PATH_TEMPLATES}/_license.md`), {
    encoding: "utf8",
  }).replace(/{%author-name%}/gi, authorName);

  const packageTemplate = readFileSync(resolve(`${BASE_PATH_TEMPLATES}/_package.md`), {
    encoding: "utf8",
  })
    .replace(/{%componentName%}/gi, `@design-system/${directoryName}`)
    .replace(/{%authorName%}/gi, authorName)
    .replace(/{%authorEmail%}/gi, authorEmail);

  const readmeTemplate = readFileSync(resolve(`${BASE_PATH_TEMPLATES}/_readme.md`), {
    encoding: "utf8",
  })
    .replace(/{%vueFileName%}/gi, componentName)
    .replace(/{%componentName%}/gi, `${directoryName}`)
    // .replace(/{%sbLink%}/gi, sbLink)
    .replace(/{%authorName%}/gi, authorName)
    .replace(/{%authorEmail%}/gi, authorEmail);

  const storybookTemplateA = readFileSync(resolve(`${BASE_PATH_TEMPLATES}/_storybook-a.md`), {
    encoding: "utf8",
  })
    .replace(/{%vueFileName%}/gi, componentName)
    .replace(/{%componentName%}/gi, componentName)
    .replace(/{%componentType%}/gi, answers["component_type"])
    .replace(/{%componentDir%}/gi, directoryName)
    .replace(/{%authorName%}/gi, authorName)
    .replace(/{%authorEmail%}/gi, authorEmail);

  const storybookTemplateB = readFileSync(resolve(`${BASE_PATH_TEMPLATES}/_storybook-b.md`), {
    encoding: "utf8",
  })
    .replace(/{%vueFileName%}/gi, componentName)
    .replace(/{%componentName%}/gi, componentName)
    .replace(/{%componentType%}/gi, answers["component_type"])
    .replace(/{%componentDir%}/gi, directoryName)
    .replace(/{%authorName%}/gi, authorName)
    .replace(/{%authorEmail%}/gi, authorEmail);

  const indexTemplate = readFileSync(resolve(`${BASE_PATH_TEMPLATES}/_index.md`), {
    encoding: "utf8",
  }).replace(/{%componentName%}/gi, componentName);

  const tsconfigMainTemplate = readFileSync(resolve(`${BASE_PATH_TEMPLATES}/_tsconfig-main.md`), {
    encoding: "utf8",
  });

  const tsconfigIndexTemplate = readFileSync(resolve(`${BASE_PATH_TEMPLATES}/_tsconfig-index.md`), {
    encoding: "utf8",
  });

  const componentTemplate = readFileSync(resolve(`${BASE_PATH_TEMPLATES}/_component.md`), {
    encoding: "utf8",
  })
    .replace(/{%componentNameCamel%}/gi, componentName)
    .replace(/{%componentNameKebab%}/gi, directoryName);

  mkdir(`${BASE_PATH_COMPONENTS}/${directoryName}`, function (error) {
    if (error) {
      console.log("Failed to create component!!");
      return;
    } else {
      mkdir(
        `${BASE_PATH_STORIES}/${answers["component_type"].toLowerCase()}/${directoryName}`,
        function (error) {
          if (error) {
            console.log("Failed to create story!!");
            return;
          } else {
            // storybook ts file
            writeFileSync(
              `${BASE_PATH_STORIES}/${answers[
                "component_type"
              ].toLowerCase()}/${directoryName}/${componentName}.stories.ts`,
              storybookTemplateA,
            );
            // storybook mdx2 file
            writeFileSync(
              `${BASE_PATH_STORIES}/${answers[
                "component_type"
              ].toLowerCase()}/${directoryName}/${componentName}.mdx`,
              storybookTemplateB,
            );
          }
        },
      );

      // component file
      writeFileSync(
        `${BASE_PATH_COMPONENTS}/${directoryName}/${componentName}.vue`,
        componentTemplate,
      );

      // index file
      writeFileSync(`${BASE_PATH_COMPONENTS}/${directoryName}/index.ts`, indexTemplate);

      // LICENSE.md
      writeFileSync(`${BASE_PATH_COMPONENTS}/${directoryName}/LICENSE.md`, licenseTemplate);

      // package.json
      writeFileSync(
        `${BASE_PATH_COMPONENTS}/${directoryName}/package.json`,
        JSON.parse(JSON.stringify(packageTemplate)),
      );

      // README.md
      writeFileSync(`${BASE_PATH_COMPONENTS}/${directoryName}/README.md`, readmeTemplate);

      // TS Config just to compile index.ts
      writeFileSync(
        `${BASE_PATH_COMPONENTS}/${directoryName}/tsconfig.index.json`,
        tsconfigIndexTemplate,
      );

      // TS Config for the vue files
      writeFileSync(`${BASE_PATH_COMPONENTS}/${directoryName}/tsconfig.json`, tsconfigMainTemplate);

      //bootstrap
      exec("yarn");
    }
  });
});
