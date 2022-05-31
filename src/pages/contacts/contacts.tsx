import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';

import './contacts.scss';

const ContactPage = () => {
  const mapRef: any = useRef();

  useEffect(() => {
    const geoMarker = new Feature({
      type: 'geoMarker',
      geometry: new Point(fromLonLat([30.51873874857184, 50.42138314372104])),
    });

    geoMarker.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({ color: '#743ad5' }),
          stroke: new Stroke({
            color: 'white',
            width: 3,
          }),
        }),
      })
    );

    const mapOptions = {
      center: fromLonLat([30.51867874857184, 50.42134914372104]),
      zoom: 18,
    };
    new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [geoMarker],
          }),
        }),
      ],
      view: new View(mapOptions),
    });
  }, [mapRef]);

  return (
    <div className="ctc_main_cont">
      <h2 className="ctc_title">ул.Антоновича 115 магазин 1ВП и 66В</h2>
      <div
        ref={mapRef}
        className="ctc_map"
        style={{ width: '80vw', height: '60vh' }}
      />
      <div className="ctc_adress">
        Адрес: Украина Кие ул. Антоновича 115. Метро "Палац Украина".
        ВЛАДИМИРСКИЙ РЫНОК . Магазин № 1ВП (пассаж) и № 66В - 4 ряд
      </div>
      <div className="ctc_tel">
        Тел: +380503587856 Сергей <br /> Тел: +380503534950 Таня <br />{' '}
        <span className="ctc_mail"> Email: bakhanenko@gmail.com</span>
      </div>
    </div>
  );
};

export default ContactPage;
