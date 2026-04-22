"use client";

import { useEffect } from "react";
import type { FunctionComponent } from "react";
import { init, trackViews, trackErrors } from "swetrix";

type Props = {
  apiURL: string;
  projectId: string;
};

const Swetrix: FunctionComponent<Props> = ({ apiURL, projectId }) => {
  useEffect(() => {
    init(projectId, {
      devMode: true,
      apiURL,
    });

    void trackViews();
    trackErrors();
    // oxlint-disable-next-line react/exhaustive-deps
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
