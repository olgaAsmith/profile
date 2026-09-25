'use client';

import Image, { type ImageProps } from 'next/image';

export const MediaImage = ({ alt, ...props }: ImageProps) => (
  <Image alt={alt} {...props} />
);
