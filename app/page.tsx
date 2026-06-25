import ContactSheet from "@/components/ContactSheet";
import { getRolls, getSeriesList } from "@/lib/data";

export default function Home() {
  return <ContactSheet rolls={getRolls()} seriesList={getSeriesList()} />;
}
