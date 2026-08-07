import {
  ReactNode,
} from "react";

import {
  QueryProvider,
} from "./QueryProvider";

import {
  ThemeProvider,
} from "./ThemeProvider";


interface Props {
  children: ReactNode;
}


export function AppProviders({
  children,
}: Props){

  return (

    <QueryProvider>

      <ThemeProvider>

        {children}

      </ThemeProvider>

    </QueryProvider>

  );
}