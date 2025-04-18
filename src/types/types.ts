export type ImageType = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export type ImageEditParamsType = {
  width: number;
  height: number;
  grayscale: boolean;
  blur: number;
};
