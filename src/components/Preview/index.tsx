import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Document, Page } from "react-pdf";

export default function Preview({ attach, onClose }: { attach: any; onClose: () => void }) {
  // pdf config
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <Modal
      open={true}
      styles={{
        content: { padding: 0 },
        header: { display: "none" },
        footer: { display: "none" },
      }}
      closable={false}
      onCancel={onClose}
      width={900}
    >
      <Document file={attach.link} onLoadSuccess={onDocumentLoadSuccess}>
        <Page renderAnnotationLayer renderTextLayer pageNumber={pageNumber} width={900} />
      </Document>
    </Modal>
  );
}
