import {
  SiInstagram,
  SiFacebook,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_STORE_NAME ?? "Shop Starter Kit",
  description:
    process.env.NEXT_PUBLIC_STORE_DESCRIPTION ??
    "A starter kit for building a shop",
  url:
    process.env.NEXT_PUBLIC_STORE_DOMAIN ??
    "https://shop-starter.albertbw.dev/",
  heroImage:
    process.env.NEXT_PUBLIC_OG_IMAGE ?? "https://yourstore.com/og-image.jpg",
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
