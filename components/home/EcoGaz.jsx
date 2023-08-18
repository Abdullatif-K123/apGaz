import React, { useState } from "react";
import Image from "next/image";
import rnPerson from "../../public/assets/png&jpg/rnPerson.jpg";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import echoGaz from "../../public/assets/svg/ecoGaz.svg";
import redApec from "../../public/assets/svg/apecRed.svg";
import Link from "next/link";
import redoted from "../../public/assets/svg/redDoted.svg";
import doted from "../../public/assets/png&jpg/doted.png";
import doted2 from "../../public/assets/svg/Group -1.svg";
import doted3 from "../../public/assets/svg/Group -3.svg";
import doted4 from "../../public/assets/svg/Group -4.svg";
import doted5 from "../../public/assets/svg/Group 511.svg";
import NextLink from "next/link";

import person from "/public/assets/png&jpg/person.jpg";
import useDownloader from "react-use-downloader";

const EcoGaz = ({ data }) => {
  const [imageError, setImageError] = useState(false);
  const { download } = useDownloader();
  const url = "https://dashboard.apec.com.lb/api/setting/download/pdfBrochure";
  const { social_link } = data;
  const { user } = data;
  const name = user.name.split(" ");
  const first_name = name[0];
  const last_name = name[1];
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div className="mainPage3">
      <Image src={doted2} width={700} height={270} className="dotedImage3" />

      <Image
        src={echoGaz}
        width={145}
        height={125}
        style={{ marginTop: "-20px" }}
      />
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
          />
        )}
        <div className="personNameCarrer3">
          <h2>
            {first_name}
            <br />
            {last_name}
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
        </div>
        <div className="personContact3">
          <h3>
            <Link href={`tel:+961${user.phone_number}`} className="link3">
              +961{user.phone_number}
            </Link>
          </h3>
          <h3>{user.location} </h3>
          <h3>
            <Link href={`mailto:${user.email}`} className="link3">
              {user.email}
            </Link>
          </h3>
        </div>
        <div className="mentionBrand3">
          <p>Powered by </p> <Image src={redApec} width={45} height={45} />
        </div>
      </div>
      <div
        className="download3  redIcon3"
        onClick={() => download(url, "Apec-cp.pdf")}
      >
        <h3>Download</h3>
        <p>our company profile</p>
      </div>
    </div>
  );
};

export default EcoGaz;
