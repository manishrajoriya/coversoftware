import React from 'react';

interface MobileCoverProps {
  innerImageUrl: string;
}

const MobileCover: React.FC<MobileCoverProps> = ({ innerImageUrl }) => {
  return (
    <div className="relative w-72">
      {/* Template Image */}
      <img
        src="/phone-template.png" // Replace with the path to your template image
        alt="Mobile Cover Template"
        className="w-full h-full object-cover "
      />
      {/* Inner Image */}
      <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] overflow-hidden ">
        <img
          src="/inner.jpg"
          alt="Inner Image"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default MobileCover;
