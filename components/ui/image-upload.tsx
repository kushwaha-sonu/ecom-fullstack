"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import {CldUploadWidget} from "next-cloudinary"

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpLoad = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemove(url)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image className="object-cover " fill src={url} alt="image" />
          </div>
        ))}
      </div>
      <CldUploadWidget
       
        onSuccess={onUpLoad}
        uploadPreset="ecomadmin">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              variant="secondary"
              type="button"
              onClick={onClick}
              disabled={disabled}>
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload An Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
