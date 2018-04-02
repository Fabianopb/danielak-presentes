import React, { Component } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import styles from './ImageGallery.module.scss';

class ImageGallery extends Component {
  state = {
    selectedImageIndex: this.props.selectedIndex
  }

  getThumbnailClass (imageIndex) {
    return imageIndex === this.state.selectedImageIndex ? 'selected' : 'selectable';
  }

  selectImage (imageIndex) {
    this.setState({selectedImageIndex: imageIndex});
  }

  render () {
    const { selectedImageIndex } = this.state;
    const { images } = this.props;
    return (
      <div>
        <Image className={styles.image} src={images[selectedImageIndex].large} />
        <div className={styles.thumbnailsContainer}>
          { _.map(images, (image, index) => (
            <div key={index} className={styles.thumbnailBox}>
              { selectedImageIndex === index ? [
                <Image key='image' className={styles.image} src={images[index].small} />,
                <div key='overlay' className={styles.selectedOverlay}>
                  <Icon disabled name='search' size='large' />
                </div>
              ] : (
                <Image
                  src={images[index].small}
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
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired
};

export default ImageGallery;
