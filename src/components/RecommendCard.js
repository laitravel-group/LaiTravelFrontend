import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { Scrollbars } from "rc-scrollbars";
import PlaceDetail from './PlaceDetail';

const { Meta } = Card;

const RecommendCard = ({ recommendedPlaces, addPlace }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDetailClick = (place) => {
    setSelectedPlace(place);
    setIsModalVisible(true);
  };

  return (
    <div>
      <Scrollbars style={{ height: 400 }} autoHide>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {recommendedPlaces.slice(0, 10).map(place => (
            <Card
              key={place.placeName}
              hoverable
              style={{ width: 240, margin: '16px' }}
              cover={<img alt={place.placeName} src={place.photo} />}
            >
              <Meta title={place.placeName} description={place.description} />
              
              <div style={{ marginTop: '16px' }}>
                <Button 
                  style={{ marginRight: '8px' }} 
                  onClick={() => handleDetailClick(place)}
                >
                  Detail
                </Button>
                <Button onClick={() => addPlace()}>Add</Button>
              </div>
            </Card>
          ))}
        </div>
      </Scrollbars>
      
      {selectedPlace && (
        <PlaceDetail 
          place={selectedPlace} 
          isModalVisible={isModalVisible} 
          setIsModalVisible={setIsModalVisible} 
        />
      )}
    </div>
  );
};

export default RecommendCard;



