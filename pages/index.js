import APGaz from "@/components/home/APGaz";
import EcoGaz from "@/components/home/EcoGaz";
import ApecGaz from "@/components/home/ApecGaz";
import PersonalInfo from "@/components/home/PersonalInfo";
import NotFound from "@/components/NotFound";
import { fetchData } from "./api/fetchData";
import EcoGAzPdf from "@/components/home/EcoGazPdf";
import { useRouter } from "next/router";
import Download from "@/components/home/Download";
export default function Home({ data, downloads }) {
  if (!data) return <NotFound />;
  if (data.user.company === "Ecogas")
    return downloads ? <Download data={data} /> : <EcoGaz data={data} />;
  if (data.user.company === "Apec")
    return downloads ? <Download data={data} /> : <PersonalInfo data={data} />;
  if (data.user.company === "Apec Gas")
    return downloads ? <Download data={data} /> : <ApecGaz data={data} />;
  if (data.user.company === "Apgaz")
    return downloads ? <Download data={data} /> : <APGaz data={data} />;
}

export async function getServerSideProps(context) {
  const { id, download } = context.query;
  let downloads = download;
  if (!download || download !== "true") downloads = false;
  const data = await fetchData(id);

  if (!data) {
    return {
      props: {
        data: null,
      },
    };
  }
  return {
    props: {
      data,
      downloads,
    },
  };
}
