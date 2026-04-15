import { Suspense } from "react";
import { SharekitFlow } from "./components/Steps/sharekitFlow";

export default function Page() {
  return (
    <Suspense fallback={<div>Lade Sharekit …</div>}>
      <SharekitFlow />
    </Suspense>
  );
}