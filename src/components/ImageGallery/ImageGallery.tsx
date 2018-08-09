import * as React from 'react';
import { Image, Icon } from 'semantic-ui-react';
import * as _ from 'lodash';
import styles from './ImageGallery.module.scss';

type ImageGalleryProps = {
  images: Array<{ large: string; small: string; }>;
  selectedIndex: number;
};

type ImageGalleryState = {
  selectedImageIndex: number;
};

class ImageGallery extends React.Component<ImageGalleryProps, ImageGalleryState> {
  public state = {
    selectedImageIndex: this.props.selectedIndex
  }

  public render () {
    const { selectedImageIndex } = this.state;
    const { images } = this.props;
    return (
      <div>
        {images.length > 0 && <Image className={styles.image} src={images[selectedImageIndex].large} />}
        <div className={styles.thumbnailsContainer}>
          { _.map(images, (image: string, index: number) => (
            <div key={index} className={styles.thumbnailBox}>
              { selectedImageIndex === index ? [
                <Image key='image' className={styles.image} src={image.small} />,
                <div key='overlay' className={styles.selectedOverlay}>
                  <Icon disabled={true} name='search' size='large' />
                </div>
              ] : (
                <Image
                  src={image.small}
                  className={styles.selectable}
                  onClick={() => this.selectImage(index)}
                />
              ) }
            </div>
          )) }
        </div>
      </div>
    );
  }

  private selectImage (imageIndex: number) {
    this.setState({selectedImageIndex: imageIndex});
  }
}

export default ImageGallery;
