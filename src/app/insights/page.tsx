import { permanentRedirect } from "next/navigation";

export default function InsightsIndexRedirect() {
  permanentRedirect("/category/insights");
}
