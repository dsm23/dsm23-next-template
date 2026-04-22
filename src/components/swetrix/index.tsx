"use client";

import { useEffect } from "react";
import type { FunctionComponent } from "react";
import { init, trackViews, trackErrors } from "swetrix";

const Swetrix: FunctionComponent = () => {
  useEffect(() => {
    init(process.env.NEXT_PUBLIC_SWETRIX_PROJECT_ID, {
      apiURL: process.env.NEXT_PUBLIC_SWETRIX_API_URL,
    });

    void trackViews();
    trackErrors();
  }, []);

  return (
    <noscript>
      {/* oxlint-disable-next-line next/no-img-element */}
      <img
        src={`${process.env.NEXT_PUBLIC_SWETRIX_API_URL}/noscript?pid=${process.env.NEXT_PUBLIC_SWETRIX_PROJECT_ID}`}
        alt=""
        referrerPolicy="no-referrer-when-downgrade"
      />
    </noscript>
  );
};

export default Swetrix;
