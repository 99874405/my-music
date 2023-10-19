import React from "react";
export const PlayCircleIcon = ({ size = 24, width, height, ...props }) => (
  <svg
  aria-hidden="true"
  fill="none"
  focusable="false"
  height={size || height}
  role="presentation"
  viewBox="0 0 24 24"
  width={size || width}
  {...props}
  >
      <path
        d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M5,12V4l7,4L5,12z"
        fill="currentColor"
      />
  </svg>
);
