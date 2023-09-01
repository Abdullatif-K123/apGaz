import React, { useEffect, useState } from "react";
import QrCode from "./QrCode";
import EcoGAzPdf from "./EcoGazPdf";
import ApecGazPdf from "./ApecGazPdf";
import ApGazPdf from "./ApGazPdf";
import PersonalInfoPdf from "./PersonalInfoPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaDownload } from "react-icons/fa";

const Download = ({ data }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const fileName = "Profile";
  const { user } = data;
  return (
    <div className="downloadPage">
      <div style={{ display: "none" }}>
        <QrCode
          value={`https://card.apec.com.lb/?id=${user.id}`}
          documentId={user.id}
        />
      </div>
      <div className="downloadPdf">
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
                "Loading doc."
              ) : (
                <p className="fontDownload">
                  Download PDF <FaDownload />
                </p>
              )
            }
          </PDFDownloadLink>
        ) : null}
      </div>
    </div>
  );
};

export default Download;
