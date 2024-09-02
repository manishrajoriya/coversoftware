"use client";
 
import { useUploadThing } from "@/lib/uploadthing";
import Dropzone from "react-dropzone";
import { UseUploadthingProps } from "@uploadthing/react";
import { useState } from "react";


export default function Home() {
  const [imageUrl, setImageUrl] = useState<string[] | null>(null);
  const [imageName, setImageName] = useState<string[] | null>(null);
  const [uploadedBy, setUploadedBy] = useState<string[] | null>(null);

  const { startUpload, isUploading } = useUploadThing("imageUploader",{
    onClientUploadComplete: (res) => {

      setImageUrl(res.map((file) => file.url));
      setImageName(res.map((file) => file.name));
      
      alert("Upload Completed");
    },
    onUploadError: (error: Error) => {
      console.log("Upload Error", error);
      alert(`ERROR! ${error.message}`);
    },
  });
  const onDropAccepted = (files: File[]) => {
    startUpload(files, { configId: "configId" });
  };
  return (
    <div>
      <div>
        <Dropzone 
          onDropAccepted={onDropAccepted}
          accept={{
            "image/*": [".png", ".jpg", ".jpeg"],
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          )}
        </Dropzone>
      </div>
      <div>
        {imageUrl && imageUrl.map((url) => (
          <img 
          src={url} 
          alt="image" 
          width={100}
          height={100}
          className="object-cover m-4 rounded-md border shadow-md"
          />
        ))}
      </div>
      <div>
        {imageName && imageName.map((name) => (
          <p>{name}</p>
        ))}
      </div>
      <div>
        {uploadedBy && uploadedBy.map((name) => (
          <p>{name}</p>
        ))}
      </div>
    </div>
    
  );
}