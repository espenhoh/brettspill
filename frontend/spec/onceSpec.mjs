//import { once, billTheUser } from "../src/once.js";
import * as onceFns from "../src/once.js";

let spyObject = {};

describe("once", () => {
    beforeEach(() => {
      spyObject = jasmine.createSpyObj('spyObject', ['billTheUser', 'onceFn']);
      spyObject.onceFn = onceFns.once(spyObject.billTheUser);
      spyOn(spyObject, "onceFn").and.callThrough();
    });
   
   it("without 'once', a function always runs", () => {
      spyObject.billTheUser();
      spyObject.billTheUser();
      spyObject.billTheUser();
      expect(spyObject.billTheUser).toHaveBeenCalledTimes(3);
    });
  
    it("with 'once', a function runs one time", () => {
      spyObject.onceFn();
      spyObject.onceFn();
      spyObject.onceFn();
      expect(spyObject.onceFn).toHaveBeenCalledTimes(3);
      expect(spyObject.billTheUser).toHaveBeenCalledTimes(1);
    });
  });

describe("onceAndAfter", () => {
  it("Should call the first function once then the other afterwards", () => {
    spyObject = jasmine.createSpyObj("spyObject",["f1","f2","onceAndAfter"]);
    spyObject.onceAndAfter = onceFns.onceAndAfter(spyObject.f1,spyObject.f2);
    spyOn(spyObject, "onceAndAfter").and.callThrough();

    spyObject.onceAndAfter();
    expect(spyObject.onceAndAfter).toHaveBeenCalledTimes(1);
    expect(spyObject.f1).toHaveBeenCalledTimes(1);
    expect(spyObject.f2).toHaveBeenCalledTimes(0);

    spyObject.onceAndAfter();
    expect(spyObject.onceAndAfter).toHaveBeenCalledTimes(2);
    expect(spyObject.f1).toHaveBeenCalledTimes(1);
    expect(spyObject.f2).toHaveBeenCalledTimes(1);

    spyObject.onceAndAfter();
    expect(spyObject.onceAndAfter).toHaveBeenCalledTimes(3);
    expect(spyObject.f1).toHaveBeenCalledTimes(1);
    expect(spyObject.f2).toHaveBeenCalledTimes(2);
  });
});


describe("ShowItself", () => {
  it("Should not display undefined", (done) => {
      new onceFns.ShowItself1("tull");
      setTimeout(() =>{
        done();
      }, 3500);
    });
});
