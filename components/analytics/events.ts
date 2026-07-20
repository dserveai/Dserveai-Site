export const EventNames = {
  CTA_CLICK: "cta_click",
  FORM_SUBMISSION: "form_submission",
  OUTBOUND_LINK: "outbound_link_click",
  SCROLL_DEPTH: "scroll_depth",
  FILE_DOWNLOAD: "file_download",
} as const;

export type EventName = typeof EventNames[keyof typeof EventNames];
