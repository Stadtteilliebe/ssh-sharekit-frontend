import { Suspense } from "react";
import { SharekitFlow } from "./components/Steps/sharekitFlow";
import { getExhibitorOptions } from "@/lib/sharekit/data/getExhibitorOptions";

export default async function Page() {
  const exhibitorOptions = await getExhibitorOptions();

  return (
    <Suspense fallback={null}>
      <SharekitFlow exhibitorOptions={exhibitorOptions} />
    </Suspense>
  );
}