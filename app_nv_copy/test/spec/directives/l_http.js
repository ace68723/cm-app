'use strict';

describe('Directive: lHttp', function () {

  // load the directive's module
  beforeEach(module('cmAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<l-http></l-http>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the lHttp directive');
  }));
});
