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
        src={`${apiURL}/log/noscript?pid=${projectId}`}
        alt=""
        referrerPolicy="no-referrer-when-downgrade"
      />
    </noscript>
  );
};

export default Swetrix;
