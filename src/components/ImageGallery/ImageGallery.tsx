import React, { useState } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import styles from './ImageGallery.module.scss';

type ImageGalleryProps = {
  images: { large: string; small: string }[];
  selectedIndex: number;
};

const ImageGallery = ({ images, selectedIndex }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(selectedIndex);

  const selectImage = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
  };

  return (
    <div>
      {images.length > 0 && (
        <Image className={styles.image} src={images[selectedImageIndex].large} />
      )}
      <div className={styles.thumbnailsContainer}>
        {images.map((image: { large: string; small: string }, index: number) => (
          <div key={image.large} className={styles.thumbnailBox}>
            {selectedImageIndex === index ? (
              [
                <Image key="image" className={styles.image} src={image.small} />,
                <div key="overlay" className={styles.selectedOverlay}>
                  <Icon disabled name="search" size="large" />
                </div>,
              ]
            ) : (
              <Image
                src={image.small}
                className={styles.selectable}
                onClick={() => selectImage(index)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
