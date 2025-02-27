interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function BlogImage({ src, alt, className = "w-full h-[400px] object-cover" }: BlogImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
    />
  );
}