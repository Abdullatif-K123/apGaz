import React, { useState } from "react";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import apGaz from "../../public/assets/svg/apGaz.svg";
import apecWhite from "../../public/assets/svg/apeWhite.svg";
import Link from "next/link";
import earthBlue from "/public/assets/png&jpg/earthBlue.png";
import person from "/public/assets/png&jpg/person.jpg";
import useDownloader from "react-use-downloader";
import QRCode from "react-qr-code";
import doted3 from "../../public/assets/svg/Group -3.svg";
import Download from "./Download";
import redDoted from "/public/assets/svg/redDoted.svg";

const APGaz = ({ data }) => {
  const [qrShow, setQrShow] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [downloadQr, setDownloadQr] = useState(false);
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
  if (qrShow) {
    return (
      <div className="mainPage2">
        <div className="scan scan1">
          <Image src={apGaz} width={185} height={145} />
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
    <div className="mainPage1"> 
          <Image src="/assets/png&jpg/homeBackground.png" width={350} height={230} alt="backgroud" style={{bottom: "20%" , width: "100%", position: "absolute", }}/>
      <Link href="https://apec.com.lb/">
        {" "}
        <Image src={apGaz} width={197} height={96} />
      </Link>
      <div className="personalInfo1">
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
            className="personImg1"
            onError={handleImageError}
          />
        )}
        <div className="personNameCarrer1">
          <h2>
            {mr} {first_name}
            <br />
            {remainingName}
          </h2>
          <p>{user.position}</p>
        </div>
        <div className="peronalSocial1">
          <div className="social1">
            <Link
              href={social_link.instagram_url}
              passHref
              className="iconBorder1"
              target="_blank"
            >
              <FaInstagram className="socialIcon1" />
            </Link>
          </div>
          <div className="social1">
            <Link
              href={social_link.facebook_url}
              passHref
              className="iconBorder1"
              target="_blank"
            >
              <FaFacebookF className="socialIcon1" />
            </Link>
          </div>
          <div className="social1">
            <Link
              href={social_link.tiktok_url}
              passHref
              className="iconBorder1"
              target="_blank"
            >
              <FaTiktok className="socialIcon1" />
            </Link>
          </div>
          <div className="social1">
            <Link
              target="_blank"
              href={social_link.linkedin_url}
              passHref
              className="iconBorder1"
            >
              <FaLinkedinIn className="socialIcon1" />
            </Link>
          </div>
          <div className="social1">
            <Link
              target="_blank"
              href="https://apec.com.lb/"
              passHref
              className="iconBorder1 iconBorderWeb"
            >
              <Image src={earthBlue} width={20} height={20} />
            </Link>
          </div>
        </div>
        <div className="personContact1">
          <h3>
            <Link
              href={`https://wa.me/${`${user.phone_number}`}`}
              className="link1"
            >
              +961{user.phone_number}
            </Link>
          </h3>
          {phoneNum ? (
            <h3>
              <Link href={`tel:${`${phoneNum}`}`} className="link1">
                {phoneNum}
              </Link>
            </h3>
          ) : null}
          <h3>{user.location}</h3>
          <h3 className="mailall">
            <Link href={`mailto:${user.email}`} className="link1">
              {user.email}
            </Link>
          </h3>
        </div>
        <div className="mentionBrand1">
          <p>Powered by </p>{" "}
          <Link href="https://apec.com.lb/">
            <Image src={apecWhite} width={45} height={45} />
          </Link>
        </div>
      </div>
      <div className="actions">
        <div className="qrShow2">
          <QRCode
            value={`https://card.apec.com.lb/?id=${user.id}`}
            size={35}
            fgColor="#da001a"
            bgColor="white"
            onClick={() => {
              setDownloadQr(true);
            }}
          />
          <h3 style={{ color: "#da001a" }}>Download</h3>
        </div>
        <Link href={url} style={{textDecoration: "none"}}>
        <div
          className="download1  redIcon2"
           
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

export default APGaz;
