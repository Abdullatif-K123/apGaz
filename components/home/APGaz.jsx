import React, { useState } from "react";
import Image from "next/image";
import rnPerson from "../../public/assets/png&jpg/rnPerson.jpg";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import apGaz from "../../public/assets/svg/apGaz.svg";
import apecWhite from "../../public/assets/svg/apeWhite.svg";
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
const APGaz = ({ data }) => {
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
    <div className="mainPage1">
      <Image src={redoted} width={900} height={270} className="dotedImage2" />
      <Image src={redoted} width={900} height={270} className="dotedImage21" />
      <Image src={apGaz} width={197} height={96} />
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
            {first_name}
            <br />
            {last_name}
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
        </div>
        <div className="personContact1">
          <h3>
            <Link href={`tel:+961${user.phone_number}`} className="link1">
              +961{user.phone_number}
            </Link>
          </h3>
          <h3>Tripoli, North Lebanon</h3>
          <h3>
            <Link href={`mailto:${user.email}`} className="link1">
              {user.email}
            </Link>
          </h3>
        </div>
        <div className="mentionBrand1">
          <p>Powered by </p> <Image src={apecWhite} width={45} height={45} />
        </div>
      </div>
      <div
        className="download1  redIcon1"
        onClick={() => download(url, "Apec-cp.pdf")}
      >
        <h3>Download</h3>
        <p>our company profile</p>
      </div>
    </div>
  );
};

export default APGaz;
