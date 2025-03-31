import {
  SiInstagram,
  SiFacebook,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { env } from "~/env";

export const siteConfig = {
  name: env.NEXT_PUBLIC_STORE_NAME ?? "Shop Starter Kit",
  description: env.NEXT_PUBLIC_STORE_DESCRIPTION,
  url: env.NEXT_PUBLIC_STORE_DOMAIN,
  heroImage: env.NEXT_PUBLIC_OG_IMAGE,
  links: {
    facebook: {
      title: "Facebook",
      url: "https://www.facebook.com/",
      icon: SiFacebook,
    },
    instagram: {
      title: "Instagram",
      url: "https://www.instagram.com/",
      icon: SiInstagram,
    },
    youtube: {
      title: "YouTube",
      url: "https://www.youtube.com/",
      icon: SiYoutube,
    },
    twitter: {
      title: "Twitter",
      url: "https://twitter.com/",
      icon: SiX,
    },
  },
  contact: {
    email: "support@yourstore.com",
    phone: "+44 7123 456789",
  },
};
