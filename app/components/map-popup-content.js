import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';
import { computed } from '@ember-decorators/object';
import moment from 'moment';
import mapboxgl from 'mapbox-gl';

export default class MapPopupContent extends Component {
  @computed('features')
  get cleanFeatures() {
    const features = this.get('features');
    if (features === null) return features;

    // add a timestamp property to sort by
    const cleanFeatures = features.map((feature) => {
      const { properties } = feature;

      const pdf = properties.altmappdf.split('/').pop();

      return {
        timestamp: parseInt(moment(properties.effective).format('X'), 10),
        pdflink: `https://nycdcp-dcm-alteration-maps.nyc3.digitaloceanspaces.com/${pdf}`,
        pdf,
        effective: moment(properties.effective).format('MMM D, YYYY'),
      };
    });

    return cleanFeatures.sort((a, b) => a.timestamp < b.timestamp);
  }

  @argument
  popup = new mapboxgl.Popup({
    closeOnClick: false,
  }).addTo(this.get('map'));

  @argument
  features = [];

  @argument
  location = {};

  @argument
  map = {};

  didUpdate() {
    const popup = this.get('popup');
    const map = this.get('map');

    popup.setDOMContent(this.element);
    popup.setLngLat(this.get('location'));
    popup.addTo(map);
  }
}
