import React, { Component } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import styles from './ImageGallery.scss';

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
      <div className={styles.imageGallery}>
        <Image src={images[selectedImageIndex].large} />
        <div className='thumbnails-container'>
          { _.map(images, (image, index) => (
            <div key={index} className='thumbnail-box'>
              { selectedImageIndex === index ? (
                <span>
                  <Image src={images[index].small} />
                  <div className='selected-overlay'>
                    <Icon disabled name='search' size='large' />
                  </div>
                </span>
              ) : (
                <Image
                  src={images[index].small}
                  className='selectable'
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
