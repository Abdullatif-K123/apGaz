import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useCallback,
} from "react";
import QrCode from "./QrCode";
import EcoGAzPdf from "./EcoGazPdf";
import ApecGazPdf from "./ApecGazPdf";
import ApGazPdf from "./ApGazPdf";
import PersonalInfoPdf from "./PersonalInfoPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaDownload } from "react-icons/fa";
import { useRouter } from "next/router";
const Download = ({ data }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [rerender, setRerender] = useState(false);
  const downloadLinkRef = useRef(null);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const fileName = "Profile";
  const { user } = data;
  const handleClicking = () => {
    setRerender(true);
  };
  const onLoadingFinished = useCallback(function () {
    // When this function is called the first time it is safe to initiate the download
    const elem = downloadLinkRef?.current;
    if (elem !== null) {
      elem.click();
    }
  }, []);
  return (
    <div className="downloadPage" style={{ display: "none" }}>
      <div>
        <QrCode
          value={`https://card.apec.com.lb/?id=${user.id}`}
          documentId={user.id}
        />
      </div>
      <div>
        {isClient ? (
          <PDFDownloadLink
            document={
              data.user.company === "Ecogas" ? (
                <EcoGAzPdf data={data} id={user.id} />
              ) : data.user.company === "Apec" ? (
                <PersonalInfoPdf data={data} id={user.id} />
              ) : data.user.company === "Apec Gas" ? (
                <ApecGazPdf data={data} id={user.id} />
              ) : (
                <ApGazPdf data={data} id={user.id} />
              )
            }
            fileName={`${fileName}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "loading Images"
              ) : (
                <WorkaroundContainer
                  ref={downloadLinkRef}
                  loading={loading}
                  onLoadingFinished={onLoadingFinished}
                />
              )
            }
          </PDFDownloadLink>
        ) : null}
      </div>
    </div>
  );
};

const WorkaroundContainer = forwardRef(function (
  { loading, onLoadingFinished },
  ref
) {
  useEffect(() => {
    if (!loading) {
      onLoadingFinished();
    }
  }, [loading]);

  // If you only want to initiate the download imperatively, hide the element via CSS (e.g. `visibility: hidden`)
  return (
    <div style={{ display: "none" }} ref={ref}>
      {loading ? "Loading..." : "Download PDF"}
    </div>
  );
});
export default Download;
