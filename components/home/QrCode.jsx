import React from "react";
import QRCode from "qrcode.react";

const QrCode = (props) => {
  const { value, documentId } = props;
  return (
    <div>
      <QRCode
        id={documentId}
        value={value}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level="M" 
      />
    </div>
  );
};
export default QrCode;
