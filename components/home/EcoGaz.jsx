import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import rnPerson from "../../public/assets/png&jpg/rnPerson.jpg";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import echoGaz from "../../public/assets/svg/ecoGaz.svg";
import redApec from "../../public/assets/svg/apecRed.svg";
import Link from "next/link";
import doted2 from "../../public/assets/svg/Group -1.svg";
import earth from "/public/assets/png&jpg/earth-ico.png";
import person from "/public/assets/png&jpg/person.jpg";
import useDownloader from "react-use-downloader";
import html2canvas from "html2canvas";
import QRCode from "react-qr-code";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
const EcoGaz = ({ data }) => {
  const imageRef = useRef(null);
  const page1 = useRef(null);
  const page2 = useRef(null);
  console.log(data);
  const [imageError, setImageError] = useState(false);
  const [qrShow, setQrShow] = useState(false);
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

  const phoneNum = user?.other_phone_number;

  return (
    <div className="mainPage3" id="mainPage3" ref={page1}>
      <Image src={doted2} width={450} height={270} className="dotedImage3" />
      <Link href="https://apec.com.lb/">
        <Image
          src={echoGaz}
          width={145}
          height={125}
          style={{ marginTop: "-20px", marginBottom: "10px" }}
        />
      </Link>
      <div className="personalInfo3">
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
            className="personImg3"
            onError={handleImageError}
            ref={imageRef}
          />
        )}
        <div className="personNameCarrer3">
          <h2>
            {mr} {first_name}
            <br />
            {remainingName}
          </h2>
          <p>{user.position}</p>
        </div>
        <div className="peronalSocial3">
          <div className="social3">
            <Link
              href={social_link.instagram_url}
              target="_blank"
              passHref
              className="iconBorder3"
            >
              <FaInstagram className="socialIcon3" />
            </Link>
          </div>
          <div className="social3">
            <Link
              href={social_link.facebook_url}
              target="_blank"
              passHref
              className="iconBorder3"
            >
              <FaFacebookF className="socialIcon3" />
            </Link>
          </div>
          <div className="social3">
            <Link
              href={social_link.tiktok_url}
              target="_blank"
              passHref
              className="iconBorder3"
            >
              <FaTiktok className="socialIcon3" />
            </Link>
          </div>
          <div className="social3">
            <Link
              target="_blank"
              href={social_link.linkedin_url}
              passHref
              className="iconBorder3"
            >
              <FaLinkedinIn className="socialIcon3" />
            </Link>
          </div>
          <div className="social">
            <Link
              target="_blank"
              href="https://apec.com.lb/"
              passHref
              className="iconBorderWeb iconBorder3"
            >
              <Image src={earth} width={20} height={20} />
            </Link>
          </div>
        </div>
        <div className="personContact3">
          <h3>
            <Link
              href={`https://wa.me/${`${user.phone_number}`}`}
              className="link3"
            >
              +{user.phone_number}
            </Link>
          </h3>
          {phoneNum ? (
            <h3>
              <Link href={`tel:${`${user.phone_number}`}`} className="link3">
                {phoneNum}
              </Link>
            </h3>
          ) : null}
          <h3>{user.location} </h3>
          <h3>
            <Link href={`mailto:${user.email}`} className="link3">
              {user.email}
            </Link>
          </h3>
        </div>
        <div className="mentionBrand3">
          <p>Powered by </p>{" "}
          <Link href="https://apec.com.lb/">
            <Image
              src={redApec}
              width={43}
              height={43}
              className="poLogoApec"
            />
          </Link>
        </div>
      </div>

      <div
        className="download3  redIcon3"
        onClick={() => download(url, "Apec.pdf")}
      >
        <h3>Download</h3>
        <p>our company profile</p>
      </div>
    </div>
  );
};

export default EcoGaz;
