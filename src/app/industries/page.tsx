import { permanentRedirect } from "next/navigation";

export default function IndustriesIndexRedirect() {
  permanentRedirect("/category/industries");
}
