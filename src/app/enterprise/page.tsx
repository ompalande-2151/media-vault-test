import { permanentRedirect } from "next/navigation";

export default function EnterpriseIndexRedirect() {
  permanentRedirect("/category/enterprise");
}
