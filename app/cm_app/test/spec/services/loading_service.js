'use strict';

describe('Service: loadingService', function () {

  // load the service's module
  beforeEach(module('helloIonicApp'));

  // instantiate service
  var loadingService;
  beforeEach(inject(function (_loadingService_) {
    loadingService = _loadingService_;
  }));

  it('should do something', function () {
    expect(!!loadingService).toBe(true);
  });

});
