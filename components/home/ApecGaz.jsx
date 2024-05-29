import React, { useState } from "react";
import Image from "next/image";
import rnPerson from "../../public/assets/png&jpg/rnPerson.jpg";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import earthRed from "/public/assets/png&jpg/earth-red.png";
import apecGaz from "../../public/assets/svg/apecGaz.svg";
import apecWhite from "../../public/assets/svg/apeWhite.svg";
import Link from "next/link";
import doted from "../../public/assets/png&jpg/doted.png";
import doted2 from "../../public/assets/svg/Group -1.svg";
import doted3 from "../../public/assets/svg/Group -3.svg";
import doted4 from "../../public/assets/svg/Group -4.svg";
import doted5 from "../../public/assets/svg/Group 511.svg";
import person from "/public/assets/png&jpg/person.jpg";
import useDownloader from "react-use-downloader";
import Download from "./Download";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "react-qr-code";
import NextLink from "next/link";
const ApecGaz = ({ data }) => {
  const [qrShow, setQrShow] = useState(false);
  const [downloadQr, setDownloadQr] = useState(false);
  const { download } = useDownloader();
  const url = "https://dashboard.apec.com.lb/api/setting/download/pdfBrochure";
  const { social_link } = data;
  const [imageError, setImageError] = useState(false);
  const { user } = data;
  const name = user.name.split(" ");
  const mr = name[0];
  const first_name = name[1];
  const remainingName = name.slice(2).join(" ");
  const handleImageError = () => {
    setImageError(true);
  };
  const phoneNum = user?.other_phone_number;

  if (qrShow) {
    return (
      <div className="mainPage2">
        <div className="scan scan2">
          <Image src={apecGaz} width={185} height={145} />
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
    <div className="mainPage2">
      <Image src={doted3} width={450} height={270} className="dotedImage3" />
      <Link href="https://apec.com.lb/">
        <Image src={apecGaz} width={197} height={96} alt={"logo"} />
      </Link>
      <div className="personalInfo2">
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
            alt="Personal Image"
            src={user.avatar}
            width={135}
            height={134}
            className="personImg2"
            style={{ objectFit: "cover" }}
            layout="fixed"
            onError={handleImageError}
          />
        )}
        <div className="personNameCarrer2">
          <h2>
            {mr} {first_name}
            <br />
            {remainingName}
          </h2>
          <p>{user.position}</p>
        </div>
        <div className="peronalSocial2">
          <div className="social2">
            <Link
              href={social_link.instagram_url}
              target="_blank"
              passHref
              className="iconBorder2"
            >
              <FaInstagram className="socialIcon2" />
            </Link>
          </div>
          <div className="social2">
            <Link
              href={social_link.facebook_url}
              target="_blank"
              passHref
              className="iconBorder2"
            >
              <FaFacebookF className="socialIcon2" />
            </Link>
          </div>
          <div className="social2">
            <Link
              href={social_link.tiktok_url}
              target="_blank"
              passHref
              className="iconBorder2"
            >
              <FaTiktok className="socialIcon2" />
            </Link>
          </div>
          <div className="social2">
            <Link
              target="_blank"
              href={social_link.linkedin_url}
              passHref
              className="iconBorder2"
            >
              <FaLinkedinIn className="socialIcon2" />
            </Link>
          </div>
          <div className="social2">
            <Link
              target="_blank"
              href="https://apec.com.lb/"
              passHref
              className="iconBorder2 iconBorderWeb"
            >
              <Image src={earthRed} width={20} height={20} />
            </Link>
          </div>
        </div>
        <div className="personContact2">
          <h3>
            <Link
              href={`https://wa.me/${`${user.phone_number}`}`}
              className="link2"
            >
              +961{user.phone_number}
            </Link>
          </h3>
          {phoneNum ? (
            <h3>
              <Link href={`tel:${`${phoneNum}`}`} className="link2">
                {phoneNum}
              </Link>
            </h3>
          ) : null}
          <h3>{user.location}</h3>
          <h3 className="mailall">
            <Link href={`mailto:${user.email}`} className="link2">
              {user.email}
            </Link>
          </h3>
        </div>

        <div className="mentionBrand2">
          <p>Powered by </p>
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
            fgColor="black"
            bgColor="white"
            onClick={() => {
              setDownloadQr(true);
            }}
          />
          <h3>Download</h3>
        </div>
        <Link href={url} style={{textDecoration: "none"}}>
        <div
          className="download2  redIcon2"
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

export default ApecGaz;
