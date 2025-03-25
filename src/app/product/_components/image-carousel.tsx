"use client";

import { type ProductImage } from "@prisma/client";
import { useState } from "react";

interface ImageCarouselProps {
  product: {
    ProductImages: ProductImage[];
    name: string;
  };
}

export default function ImageCarousel({ product }: ImageCarouselProps) {
  const [selectedImage, setSelectedImage] = useState(
    product.ProductImages[0]?.id,
  );

  const selectedImageUrl = product.ProductImages.find(
    (image) => image.id === selectedImage,
  )?.imageUrl;

  return (
    <div>
      <picture>
        <img
          className="aspect-square w-full object-cover"
          src={selectedImageUrl}
          alt={product.name}
        />
      </picture>

      {product.ProductImages.length > 1 && (
        <div className="flex flex-row justify-center gap-2 py-1">
          {product.ProductImages.map((image) => (
            <picture key={image.id}>
              <img
                className="aspect-square h-16 w-16 border border-muted-foreground/80 object-cover p-0.5 data-[active=true]:border-primary"
                src={image.imageUrl}
                alt={product.name}
                data-active={selectedImage === image.id}
                onClick={() => setSelectedImage(image.id)}
              />
            </picture>
          ))}
        </div>
      )}
    </div>
  );
}
