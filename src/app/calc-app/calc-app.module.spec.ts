import { CalcAppModule } from './calc-app.module';

describe('CalcAppModule', () => {
  let calcAppModule: CalcAppModule;

  beforeEach(() => {
    calcAppModule = new CalcAppModule();
  });

  it('should create an instance', () => {
    expect(calcAppModule).toBeTruthy();
  });
});
