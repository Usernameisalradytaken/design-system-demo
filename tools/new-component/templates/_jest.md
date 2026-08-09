import { mount } from "@vue/test-utils";
import {%componentName%} from "@/{%componentDir%}/{%componentName%}.vue";

describe("{%componentName%}.vue", () => {
const wrapper = mount({%componentName%});

// test for vue instance
test("is a Vue instance", () => {
expect(wrapper.isVueInstance()).toBeTruthy();
});
});
