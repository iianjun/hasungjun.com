"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useRef, useState } from "react";

import { Skeleton } from "@/shared/ui";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function KoResume() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState<number>(595);
  const [numPages, setNumPages] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setPageWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div ref={containerRef} className="w-a4">
      <Document
        file="/resume_hasung_jun_ko.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<Skeleton className="h-a4 w-full" />}
      >
        {Array.from({ length: numPages }).map((_, index) => (
          <Page
            width={pageWidth}
            key={index}
            pageNumber={index + 1}
            loading={null}
          />
        ))}
      </Document>
    </div>
  );
}
