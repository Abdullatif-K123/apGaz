import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  View,
  Image,
  Text,
  PDFViewer,
  Svg,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
// Register the "sans-serif" font
Font.register({
  family: "Montserrat",
  fontWeight: 600,
  src: "/assets/fonts/Montserrat-SemiBold.ttf",
});
Font.register({
  family: "Montserrat",
  fontWeight: 700,
  src: "/assets/fonts/Montserrat-ExtraBold.ttf",
});
Font.register({
  family: "Montserrat",
  fontStyle: "italic",
  src: "/assets/fonts/Montserrat-SemiBoldItalic.ttf",
});
const styles = StyleSheet.create({
  page: {
    display: "block",
  },
  view: {
    display: "flex",
    flexDirection: "column",
    marginTop: "40%",
    alignItems: "center",
  },
  qrImage: {
    width: "250px",
    height: "250px",
  },
  textColoring: {
    color: "#d0031f",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: 49, // Change the font size here
    marginTop: "60px",
  },
  svg: {
    width: 255,
    height: 75,
    marginTop: "20px",
    marginBottom: "60px",
  },
  mainScan3: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 15,
  },
  personalInfo3: {
    backgroundColor: "#0060ad",
    minWidth: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
    marginBottom: "10px",
    rowGap: "25px",
    padding: "70px 0 0 0",
    borderRadius: "37px",
    zIndex: 10,
  },
  personNameCarrer3: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  personName3: {
    color: "#fff",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "40pt",
  },
  personName2: {
    color: "#fff",
    fontWeight: "400",
    textAlign: "center",
    fontSize: "22pt",
    marginTop: "10px",
  },
  peronalSocial3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: "60px",
  },
  iconBorder3: {
    backgroundColor: "#fff",
    padding: "13px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon3: {
    fontSize: "19px",
    color: "#fff",
    width: "27px",
    height: "27px",
  },
  personContact3: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: "40px",
    color: "#fff",
    width: "90%",
    marginTop: "10px",
  },
  showBorder: {
    borderBottom: "1px solid #fff",
    width: "400px",
    display: "flex",
    alignItems: "center",
  },
  personText: {
    fontSize: "27pt",
    textAlign: "center",
    paddingBottom: "20px",
  },
  mentionBrand3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "5px",
    paddingBottom: "30px",
    marginTop: "15px",
  },
  imgMention: {
    marginTop: "10px",
    width: "50px",
    height: "20px",
  },
  mentionText: {
    fontFamily: "Montserrat",
    fontStyle: "italic",
    fontSize: "20px",
    color: "#fff",
  },
});

const ApGazPdf = ({ data, id }) => {
  const dataUrl = document.getElementById(id).toDataURL();
  const { user } = data;
  const name = user.name.split(" ");
  const mr = name[0];
  const first_name = name[1];
  const remainingName = name.slice(2).join(" ");
  const customPageSize = { width: 600, height: 1050 };
  const phoneNum = user?.other_phone_number;
  return (
    <Document>
      <Page size={customPageSize} style={styles.mainScan3}>
        <Image src={"/assets/png&jpg/apGaz.png"} style={styles.svg} />
        <View style={styles.personalInfo3}>
          <View style={styles.personNameCarrer3}>
            <Text style={styles.personName3}>
              {mr} {first_name}
            </Text>
            <Text style={styles.personName3}>{remainingName}</Text>
            <Text style={styles.personName2}>{user.position}</Text>
          </View>
          <View style={styles.personContact3}>
            <View style={styles.showBorder}>
              <Text style={styles.personText}>+{user.phone_number}</Text>
            </View>
            {phoneNum ? (
              <View style={styles.showBorder}>
                {" "}
                <Text style={styles.personText}>{phoneNum}</Text>{" "}
              </View>
            ) : null}
            <View style={styles.showBorder}>
              <Text style={styles.personText}>{user.email}</Text>
            </View>{" "}
            <Text style={styles.personText}>{user.location}</Text>
          </View>
          <View style={styles.mentionBrand3}>
            <Text style={styles.mentionText}>Powered by</Text>
            <Image
              src="/assets/png&jpg/apeWhite.png"
              style={styles.imgMention}
            />
          </View>
        </View>
      </Page>
      <Page size={customPageSize}>
        <View style={styles.mainScan3}>
          <View style={styles.view}>
            <Image
              AllowDangerousPaths
              src={"/assets/png&jpg/apGaz.png"}
              style={styles.svg}
            />
            <Image src={dataUrl} style={styles.qrImage} />
            <Text style={styles.textColoring}>
              SCAN <Text style={{ color: "#0060ad" }}>ME</Text>
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default ApGazPdf;
