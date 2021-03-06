import {DecoratorParameters, DecoratorTypes, getDecoratorType, UnsupportedDecoratorType} from "@tsed/core";
import {JsonEntityStore} from "../../domain/JsonEntityStore";
import {JsonEntityFn} from "./jsonEntityFn";

/**
 * Add a example metadata on the decorated element.
 *
 * @returns {(...args: any[]) => any}
 * @decorator
 * @method
 * @property
 * @param examples
 */
export function Example(examples: any): Function;
export function Example(name: string, description: string): Function;
export function Example(name: string | any, description?: string) {
  let example: any;

  if (description) {
    example = {[name]: description};
  } else {
    example = name;
  }

  return JsonEntityFn((store: JsonEntityStore, args: DecoratorParameters) => {
    switch (getDecoratorType(args, true)) {
      case DecoratorTypes.CLASS:
      case DecoratorTypes.PROP:
        store.schema.examples(example);
        break;

      default:
        throw new UnsupportedDecoratorType(Example, args);
    }
  });
}
