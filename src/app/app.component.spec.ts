import { noop } from 'rxjs';
import { beforeEachCompiler, FixturePayload } from 'test-base';
import { AppComponent } from './app.component';

it('Should init the Test Suite', noop); // ****** The first test fails unless I add this ******

describe('AppComponent', (): void => {
  let instance: AppComponent;

  beforeEach(async (): Promise<void> => {
    try {
      const fixturePayload: FixturePayload<AppComponent> = await beforeEachCompiler(
        AppComponent,
        [],
        [],
        [AppComponent],
        []
      );
      instance = fixturePayload.instance;
    } catch (error) {
      console.log(error); // tslint:disable-line:no-console
    }
  });

  describe('constructor', (): void => {
    it('should create the app', (): void => {
      expect(instance).toBeDefined();
    });
  });

  describe('ngOnInit', (): void => {
    it('should initialize the component', (): void => {
      expect(instance.value).toBeFalsy();

      instance.ngOnInit();

      // Error is reported on line 37. Reported line is farther away the further down the file the test is
      expect(instance.value).toBeFalsy();
    });
  });

});
