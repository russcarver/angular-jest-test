import 'jest-zone-patch';

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(document.body.style, 'transform', {
  value: (): Object => {
    return {
      configurable: true,
      enumerable: true
    };
  }
});
