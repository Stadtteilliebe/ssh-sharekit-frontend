import { ReactNode } from "react";

export function classNames(...classes: ReactNode[]): string {
  // get every single element
  const attributes = classes.map((el) => el?.toString().split(" ")).flat();

  // leave out all those who are not a real value
  const filter = attributes.filter((value) => !!value);

  // join all of them together as 1 big string
  const join = filter.join(" ");

  return join;
}