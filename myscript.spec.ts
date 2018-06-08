
import { ColorMixer } from './myscript';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { addMatchers } from 'jasmine-marbles';
import { initTestScheduler } from 'jasmine-marbles';
import { resetTestScheduler } from 'jasmine-marbles';
import { scott } from 'jasmine-marbles';
import { Color } from './color.enum';
import { Observable } from 'rxjs/Observable';
import {} from 'jasmine';

describe('ColorMixer', () => {

  describe('mix', () => {

    it('should mix colors', () => {
      addMatchers();
      initTestScheduler();
      const r = cold('--o--x--|', onOffMarbles());
      const y = cold('--------|', onOffMarbles());
      const b = cold('--o-----|', onOffMarbles());

      // Start mixing red and blue @ frame 20.
      // Purple is made @ frame 40 (20 frame mixing time).
      // Remove red @ frame 50 to make blue @ frame 70.
      const c = cold('x---p--b|', colorMarbles());

      expect(mix(r, y, b)).toBeObservable(c);
      getTestScheduler().flush();
      resetTestScheduler();
    });

  });

});


// Change the mixing time to 20 frames and use the TestScheduler
function mix(r: Observable<boolean>,
             y: Observable<boolean>,
             b: Observable<boolean>) {
  return ColorMixer.mix(r, y, b, 20, getTestScheduler());
}

// Marble values representing on/off
function onOffMarbles() {
  return {
    o: true,
    x: false
  }
}

// Marble values representing colors
function colorMarbles() {
  return {
    x: Color.NONE,
    r: Color.RED,
    o: Color.ORANGE,
    y: Color.YELLOW,
    g: Color.GREEN,
    b: Color.BLUE,
    p: Color.PURPLE,
    B: Color.BLACK
  }
}

