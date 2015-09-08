# threejs-additions
Some helpful utilities for working with three.js

## additions.Matrix4
A simple wrapper around ```THREE.Matrix4``` which provides an alternative API for working with matrices in an immutable way instead of the in-place modification functions included in three.js.

```additions.Matrix4``` objects contain an ```elements``` property, so they can be used in many cases where a ```THREE.Matrix4``` is required.

All functions simply forward onto the equivalent ```THREE.Matrix4``` function, so see the three.js documentation for more information on what they do.

### Creating a matrix

```javascript
var identity = new additions.Matrix4();
var copyFromThreeJsMatrix = new additions.Matrix4(myThreeJsMatrix);
var matrixFromElements = new additions.Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16); 
```

### Functions
These functions should be called on an existing ```additions.Matrix4``` instance:
 * ```extractBasis```
 * ```applyToVector3Array```
 * ```determinant```
 * ```flattenToArrayOffset```
 * ```getMaxScaleOnAxis```
 * ```decompose```
 * ```toArray```

These functions should be called on an existing ```additions.Matrix4``` instance. They return a new ```additions.Matrix4``` which contains the result of the operation and they leave the original matrix unchanged.
 * ```extractPosition```
 * ```copyPosition```
 * ```extractRotation```
 * ```getInverse```
 * ```multiply```
 * ```multiplyScalar```
 * ```transpose```
 * ```setPosition```
 * ```scale```

These functions can be called directly without creating an ```additions.Matrix4``` first.
 * ```additions.Matrix4.identity```
 * ```additions.Matrix4.extractRotation```
 * ```additions.Matrix4.getInverse```
 * ```additions.Matrix4.makeBasis```
 * ```additions.Matrix4.makeRotationFromEuler```
 * ```additions.Matrix4.makeRotationFromQuaternion```
 * ```additions.Matrix4.lookAt```
 * ```additions.Matrix4.multiplyMatrices```
 * ```additions.Matrix4.multiplyToArray```
 * ```additions.Matrix4.makeTranslation```
 * ```additions.Matrix4.makeRotationX```
 * ```additions.Matrix4.makeRotationY```
 * ```additions.Matrix4.makeRotationZ```
 * ```additions.Matrix4.makeRotationAxis```
 * ```additions.Matrix4.makeScale```
 * ```additions.Matrix4.compose```
 * ```additions.Matrix4.makeFrustum```
 * ```additions.Matrix4.makePerspective```
 * ```additions.Matrix4.makeOrthographic```
 * ```additions.Matrix4.fromArray```
