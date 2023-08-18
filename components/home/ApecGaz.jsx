import React, { useState } from "react";
import Image from "next/image";
import rnPerson from "../../public/assets/png&jpg/rnPerson.jpg";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
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
import NextLink from "next/link";
const ApecGaz = ({ data }) => {
  const { download } = useDownloader();
  const url = "https://dashboard.apec.com.lb/api/setting/download/pdfBrochure";
  const { social_link } = data;
  const [imageError, setImageError] = useState(false);
  const { user } = data;
  const name = user.name.split(" ");
  const first_name = name[0];
  const last_name = name[1];
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div className="mainPage2">
      <Image src={doted3} width={500} height={270} className="dotedImage2" />
      <Image src={apecGaz} width={197} height={96} alt={"logo"} />
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
            onError={handleImageError}
          />
        )}
        <div className="personNameCarrer2">
          <h2>
            {first_name}
            <br />
            {last_name}
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
        </div>
        <div className="personContact2">
          <h3>
            <Link href={`tel:+961${user.phone_number}`} className="link2">
              +961{user.phone_number}
            </Link>
          </h3>
          <h3>Tripoli, North Lebanon</h3>
          <h3>
            <Link href={`mailto:${user.email}`} className="link2">
              {user.email}
            </Link>
          </h3>
        </div>
        <div className="mentionBrand2">
          <p>Powered by </p> <Image src={apecWhite} width={45} height={45} />
        </div>
      </div>
      <div
        className="download2  redIcon2"
        onClick={() => download(url, "Apec-cp.pdf")}
      >
        <h3>Download</h3>
        <p>our company profile</p>
      </div>
    </div>
  );
};

export default ApecGaz;
