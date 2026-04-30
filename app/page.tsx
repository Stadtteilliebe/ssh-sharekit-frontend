import { Suspense } from "react";
import { SharekitFlow } from "./components/Steps/sharekitFlow";
import { getExhibitorOptions } from "@/lib/sharekit/data/getExhibitorOptions";
import { getPartnerOptions } from "@/lib/sharekit/data/getPartnerOptions";

export default async function Page() {
const exhibitorOptions = await getExhibitorOptions();
const partnerOptions = await getPartnerOptions();

return (
  <Suspense fallback={null}>
    <SharekitFlow
      exhibitorOptions={exhibitorOptions}
      partnerOptions={partnerOptions}
    />
  </Suspense>
)};