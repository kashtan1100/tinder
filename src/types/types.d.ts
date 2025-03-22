interface TImage {
  id: number;
  imageUrl: string;
}

export interface TUser {
  id: number;
  name: string;
  age: number;
  job_title: string;
  profile_image_url: string;
  images: TImage[];
}

export interface TSlidesRef {
  target: any;
}
