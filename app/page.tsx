import { SharekitFlow } from "./components/Steps/sharekitFlow";
import { getExhibitorOptions } from "@/lib/sharekit/data/getExhibitorOptions";

export default async function Page() {
  const exhibitorOptions = await getExhibitorOptions();
  
  return <SharekitFlow exhibitorOptions={exhibitorOptions} />;
}