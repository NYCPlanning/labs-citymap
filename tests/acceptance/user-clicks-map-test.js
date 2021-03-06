import { module, skip } from 'qunit';
import { visit, click, triggerEvent, pauseTest, find, waitUntil } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | user clicks map', function(hooks) {
  setupApplicationTest(hooks);

  skip('user clicks map, sees popup', async function(assert) {
    await visit('/');
    const { width, height } = find('.mapboxgl-canvas').getBoundingClientRect();
    await waitUntil(() => find('.mapboxgl-interactive'));
    await click('.mapboxgl-canvas', { clientX: width / 2, clientY: height / 2 });
    await waitUntil(() => find('.mapboxgl-popup'));
    const popup = await find('.mapboxgl-popup');

    assert.ok(popup);

    await click('.mapboxgl-popup-close-button');    

    // assert that you don't find popup after closing
    assert.ok(!find('.mapboxgl-popup-close-button'));
  });
});
