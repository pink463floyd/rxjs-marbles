import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/startWith';
import { Observable } from 'rxjs/Observable';
import { IScheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { Color } from './color.enum';
console.log("Hello!")
console.log(scott());
export class ColorMixer {

  static mix(r: Observable<boolean>,
             y: Observable<boolean>,
             b: Observable<boolean>,
             // Allow configuration during testing
             mixingTime = 1000,
             // Allow the use of the TestScheduler during testing
             scheduler: IScheduler = async): Observable<Color> {

    return Observable.combineLatest(
      // Every color starts off
      r.startWith(false),
      y.startWith(false),
      b.startWith(false),

      // Mix the colors
      (redOn, yellowOn, blueOn) => {

        if (!redOn && !yellowOn && !blueOn) {
          return Color.NONE;
        } else if (redOn && !yellowOn && !blueOn) {
          return Color.RED;
        } else if (redOn && yellowOn && !blueOn) {
          return Color.ORANGE;
        } else if (!redOn && yellowOn && !blueOn) {
          return Color.YELLOW;
        } else if (!redOn && yellowOn && blueOn) {
          return Color.GREEN;
        } else if (!redOn && !yellowOn && blueOn) {
          return Color.BLUE;
        } else if (redOn && !yellowOn && blueOn) {
          return Color.PURPLE;
        } else {
          return Color.BLACK;
        }
    })
      .debounceTime(mixingTime, scheduler)
      .startWith(Color.NONE)
      .distinctUntilChanged();
      console.log("Hello 2!")
  }

}

