'use strict';

describe('Service: addrService', function () {

  // load the service's module
  beforeEach(module('helloIonicApp'));

  // instantiate service
  var addrService;
  beforeEach(inject(function (_addrService_) {
    addrService = _addrService_;
  }));

  it('should do something', function () {
    expect(!!addrService).toBe(true);
  });

});
