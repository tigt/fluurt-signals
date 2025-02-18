import {
  dynamicOn,
  compute,
  get,
  Signal,
  set,
  register
} from "../../../../dom/index";

import { beginEl, endEl, dynamicText } from "../../../../dom/dom";

const click = (container: Element) => {
  container.querySelector("button")!.click();
};

export const inputs = [{}, click, click, click] as const;

const renderer = register(
  __dirname.split("/").pop()!,
  (input: (typeof inputs)[0]) => {
    beginEl("button");
    const clickCount = new Signal(0);
    dynamicOn(
      "click",
      compute(() =>
        get(clickCount) <= 1
          ? () => {
              set(clickCount, get(clickCount) + 1);
            }
          : false
      )
    );
    dynamicText(clickCount);
    endEl();
  }
);

renderer.input = ["value"];

export default renderer;
