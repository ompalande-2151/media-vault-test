import { permanentRedirect } from "next/navigation";

export default function LeadershipIndexRedirect() {
  permanentRedirect("/category/leadership");
}
