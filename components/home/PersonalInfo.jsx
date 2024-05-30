import React, { useEffect, useState } from "react";
import Image from "next/image";
import apecWhite from "../../public/assets/svg/apeWhite.svg";
import rnPerson from "../../public/assets/png&jpg/rnPerson.jpg";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import doted2 from "../../public/assets/svg/Group -1.svg";
import useDownloader from "react-use-downloader";
import earth from "/public/assets/png&jpg/earth-ico.png";
import person from "/public/assets/png&jpg/person.jpg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "react-qr-code";
import Download from "./Download";
import doted3 from "../../public/assets/svg/Group -3.svg";
const PersonalInfo = ({ data }) => {
  const [qrShow, setQrShow] = useState(false);

  const [downloadQr, setDownloadQr] = useState(false);
 
  const [imageError, setImageError] = useState(false);
  const { download } = useDownloader();
  const url = "https://dashboard.apec.com.lb/api/setting/download/pdfBrochure";
  const { social_link } = data;
  const { user } = data;
  const name = user.name.split(" ");
  const mr = name[0];
  const first_name = name[1];
  const remainingName = name.slice(2).join(" ");
  const handleImageError = () => {
    setImageError(true);
  };
  //side effect for downloading the pdf 
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDownloadQr(false);
    }, 3000);
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, [download, setDownloadQr]);
  const phoneNum = user?.other_phone_number;
  const handleDownload = () => {
    const input = document.body;
    let sizeWidth = 1;
    window.innerWidth >= 390
      ? (sizeWidth = 2.8)
      : window.innerWidth <= 375
      ? (sizeWidth = 2.5)
      : (sizeWidth = 2.7);
    if (window.innerWidth >= 405) {
      sizeWidth = 3.2;
    }
    if (window.innerWidth <= 420 && window.innerWidth >= 405) {
      sizeWidth = 3;
    }

    html2canvas(input, { width: window.width, height: window.height }).then(
      (canvas) => {
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        let quarter = imgWidth / sizeWidth;
        if (qrShow) quarter = 1;
        console.log(imgWidth);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait", // adjust orientation if needed
          unit: "px",
          format: [imgWidth - quarter, imgHeight], // set PDF dimensions to match the screenshot
          marginLeft: 0,
        });

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("cardQr.pdf");
      }
    );
  };
  if (qrShow) {
    return (
      <div className="mainPage">
        <div className="scan scan">
          <Image src={apecWhite} width={185} height={145} alt="apec logo" />
          <QRCode
            value={`https://card.apec.com.lb/?id=${user.id}`}
            size={190}
            fgColor="black"
            bgColor="white"
            onClick={handleDownload}
          />
          <h1>
            SCAN <span>ME</span>
          </h1>
          <div className="download2 qr" onClick={() => setQrShow(false)}>
            <h3>Back to profile</h3>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mainPage">
      <Image src="/assets/png&jpg/homeBackground.png" width={350} height={230} alt="backgroud" style={{bottom: "20%" , width: "100%", position: "absolute", }}/>
      <Link href="https://apec.com.lb/">
        <Image
          src={apecWhite}
          width={135.28}
          height={116}
          className="apecLogo"
        />
      </Link>
      <div className="personalInfo">
        {imageError ? (
          <Image
            src={person}
            width={135}
            height={134}
            className="personImg2"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Image
            src={user.avatar}
            width={134}
            height={134}
            style={{ objectFit: "cover" }}
            className="personImg"
            onError={handleImageError}
          />
        )}
        <div className="personNameCarrer">
          <h2>
            {mr} {first_name}
            <br />
            {remainingName}
          </h2>
          <p>{user.position}</p>
        </div>
        <div className="peronalSocial">
          <div className="social">
            <Link
              href={social_link.instagram_url}
              target="_blank"
              passHref
              className="iconBorder"
            >
              <FaInstagram className="socialIcon" />
            </Link>
          </div>
          <div className="social">
            <Link
              href={social_link.facebook_url}
              target="_blank"
              passHref
              className="iconBorder"
            >
              <FaFacebookF className="socialIcon" />
            </Link>
          </div>
          <div className="social">
            <Link
              href={social_link.tiktok_url}
              target="_blank"
              passHref
              className="iconBorder"
            >
              <FaTiktok className="socialIcon" />
            </Link>
          </div>
          <div className="social">
            <Link
              target="_blank"
              href={social_link.linkedin_url}
              passHref
              className="iconBorder"
            >
              <FaLinkedinIn className="socialIcon" />
            </Link>
          </div>
          <div className="social">
            <Link
              target="_blank"
              href="https://apec.com.lb/"
              passHref
              className="iconBorderweb"
            >
              <Image src={earth} width={20} height={20} alt="earth" />
            </Link>
          </div>
        </div>
        <div className="personContact">
          <h3>
            <Link
              href={`https://wa.me/${`${user.phone_number}`}`}
              className="link"
            >
              +961{user.phone_number}
            </Link>
          </h3>
          {phoneNum ? (
            <h3>
              <Link href={`tel:${`${phoneNum}`}`} className="link">
                {phoneNum}
              </Link>
            </h3>
          ) : null}
          <h3>{user.location}</h3>
          <h3 className="mailall">
            <Link href={`mailto:${user.email}`} className="link">
              {user.email}
            </Link>
          </h3>
        </div>
      </div>
      <div className="actions" style={{ backgroundColor: "#c11821" }}>
        <div className="qrShow2">
          <QRCode
            value={`https://card.apec.com.lb/?id=${user.id}`}
            size={35}
            fgColor="#c11622"
            bgColor="white"
            onClick={() => {
              setDownloadQr(true);
            }}
          />
          <h3>Download</h3>
        </div>
        <Link href={url} style={{textDecoration: "none"}}>
        <div
          className="download  redIcon2"
        >
          <h3>Download</h3>
          <p>our company profile</p>
        </div>
        </Link>
      </div>
      {downloadQr ? <Download data={data} /> : null}
    </div>
  );
};

export default PersonalInfo;
