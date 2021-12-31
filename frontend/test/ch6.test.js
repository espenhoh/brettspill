import { getField , fibCalls, randomizer} from './ch6';


//6.1
test('getfield should return null when invoked on null objects', () => {
    let getNull = getField('what');
    expect(getNull(null)).toBeNull();
  });

//6.2
test('fibCalls(6) should be 25', () => {
    expect(fibCalls(6)).toBe(25);
  });


//6.3
test('randomizer should return different function for different random value', () => {
    const randomMath = randomizer(Math.floor, Math.ceil, Math.round);
    jest.spyOn(global.Math, 'random').mockReturnValue(0.9999);
    expect(randomMath()(6.4)).toBe(6);
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
    expect(randomMath()(6.9)).toBe(6);
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    expect(randomMath()(6.9)).toBe(7);
    jest.spyOn(global.Math, 'random').mockReturnValue(0.9999);
    expect(randomMath()(6.6)).toBe(7);
    jest.spyOn(global.Math, 'random').mockRestore();
  });

test('randomizer should never return the same function twice', () => {
    const randomMath = randomizer(Math.floor, Math.ceil, Math.round);
    jest.spyOn(global.Math, 'random').mockReturnValueOnce(0.9999).mockReturnValueOnce(0.9999).mockReturnValueOnce(0.9999).mockReturnValueOnce(0);
    expect(randomMath()).not.toBe(randomMath());
    jest.spyOn(global.Math, 'random').mockRestore();
  });