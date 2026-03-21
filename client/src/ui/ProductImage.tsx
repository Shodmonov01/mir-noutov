import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import { LuPackage } from 'react-icons/lu';

interface ProductImageProps {
  src: string;
  alt: string;
  fallbackIcon?: React.ReactNode;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  fallbackIcon = <LuPackage size={24} />,
}) => {
  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <Flex
        w="100%"
        h="100%"
        bg="bg.muted"
        align="center"
        justify="center"
        color="fg.muted"
      >
        {fallbackIcon}
      </Flex>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      objectFit="cover"
      w="100%"
      h="100%"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
};
