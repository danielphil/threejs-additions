QUnit.module("Matrix4");

QUnit.test("Creation", function(assert) {
    var identity = new THREE.Matrix4();

    assert.deepEqual(
        new additions.Matrix4().elements,
        identity.elements,
        "Matrix should be initialised to identity on creation"
    );

    var nonZero = new THREE.Matrix4();
    nonZero.set(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
    var additionsMatrix = new additions.Matrix4(nonZero);
    assert.deepEqual(
        additionsMatrix.elements,
        nonZero.elements,
        "Should be possible to initialise Matrix from an existing three.js matrix"
    );

    var nonZeroCopy = new THREE.Matrix4();
    nonZeroCopy.copy(nonZero);
    nonZero.identity();
    assert.deepEqual(
        additionsMatrix.elements,
        nonZeroCopy.elements,
        "Modifying the source three.js matrix after creation should not modify the additions.Matrix4"
    );    
});

QUnit.test("extractBasis", function(assert) {
    testHelper(assert, function (threeExpected, additionsMatrix) {
        var xAxisExpected = new THREE.Vector3();
        var yAxisExpected = new THREE.Vector3();
        var zAxisExpected = new THREE.Vector3();

        var xAxis = new THREE.Vector3();
        var yAxis = new THREE.Vector3();
        var zAxis = new THREE.Vector3();

        threeExpected.extractBasis(xAxisExpected, yAxisExpected, zAxisExpected);
        additionsMatrix.extractBasis(xAxis, yAxis, zAxis);

        assert.deepEqual(vectorAsArray(xAxis), vectorAsArray(xAxisExpected), "xAxis should match expected");
        assert.deepEqual(vectorAsArray(yAxis), vectorAsArray(yAxisExpected), "yAxis should match expected");
        assert.deepEqual(vectorAsArray(zAxis), vectorAsArray(zAxisExpected), "zAxis should match expected");
    });
});

QUnit.test("applyToVector3Array", function(assert) {
    testHelper(assert, function (threeExpected, additionsMatrix) {
        var expectedVec = [1, 1, 1];
        var vec = [1, 1, 1];
        threeExpected.applyToVector3Array(expectedVec);
        additionsMatrix.applyToVector3Array(vec);

        assert.deepEqual(vec, expectedVec, "applyToVector3Array behaviour should match THREE.Matrix4");
    });
});

QUnit.test("determinant", function(assert) {
    testHelper(assert, function (threeExpected, additionsMatrix) {
        var expectedDet = threeExpected.determinant();
        var det = additionsMatrix.determinant();  
        assert.deepEqual(det, expectedDet, "determinant behaviour should match THREE.Matrix4");
    });
});

QUnit.test("flattenToArrayOffset", function(assert) {
    testHelper(assert, function (threeExpected, additionsMatrix) {
        var expectedArray = [];
        var arr = [];
        _(16).times(function () {
            expectedArray.push(0);
            arr.push(0);
        });

        threeExpected.flattenToArrayOffset(expectedArray, 0);
        additionsMatrix.flattenToArrayOffset(arr, 0);

        assert.deepEqual(arr, expectedArray, "flattenToArrayOffset behaviour should match THREE.Matrix4");
    });
});

QUnit.test("getMaxScaleOnAxis", function(assert) {
    testHelper(assert, function (threeExpected, additionsMatrix) {
        var expected = threeExpected.getMaxScaleOnAxis();
        var actual = additionsMatrix.getMaxScaleOnAxis();  
        assert.deepEqual(actual, expected, "getMaxScaleOnAxis behaviour should match THREE.Matrix4");
    });
});

QUnit.test("decompose", function(assert) {
    testHelper(assert, function (threeExpected, additionsMatrix) {
        var expectedTranslation = new THREE.Vector3();
        var expectedRotation = new THREE.Quaternion();
        var expectedScale = new THREE.Vector3();

        var actualTranslation = new THREE.Vector3();
        var actualRotation = new THREE.Quaternion();
        var actualScale = new THREE.Vector3();

        threeExpected.decompose(expectedTranslation, expectedRotation, expectedScale);
        additionsMatrix.decompose(actualTranslation, actualRotation, actualScale);  
        
        assert.deepEqual(
            vectorAsArray(actualTranslation),
            vectorAsArray(expectedTranslation),
            "decompose translation should match THREE.Matrix4 behaviour"
        );

        assert.deepEqual(
            quaternionAsArray(actualRotation),
            quaternionAsArray(expectedRotation),
            "decompose rotation should match THREE.Matrix4 behaviour"
        );

        assert.deepEqual(
            vectorAsArray(actualScale),
            vectorAsArray(expectedScale),
            "decompose scale should match THREE.Matrix4 behaviour"
        );
    });
});

QUnit.test("toArray", function(assert) {
    testHelper(assert, function (threeExpected, additionsMatrix) {
        var expected = threeExpected.toArray();
        var actual = additionsMatrix.toArray();  
        assert.deepEqual(actual, expected, "toArray behaviour should match THREE.Matrix4");
    });
});

QUnit.test("identity", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        return [newThreeMatrix.identity(), additions.Matrix4.identity()];
    });
});

QUnit.test("makeBasis", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        var x = new THREE.Vector3(0, 1, 0);
        var y = new THREE.Vector3(1, 0, 0);
        var z = new THREE.Vector3(0, 0, 1);
        return [newThreeMatrix.makeBasis(x, y, z), additions.Matrix4.makeBasis(x, y, z)];
    });
});

QUnit.test("makeRotationFromEuler", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        var rot = new THREE.Euler(0, 1, 1.57, 'XYZ');
        return [
            newThreeMatrix.makeRotationFromEuler(rot),
            additions.Matrix4.makeRotationFromEuler(rot)
        ];
    });
});

QUnit.test("makeRotationFromQuaternion", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        var rot = new THREE.Quaternion();
        rot.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
        return [
            newThreeMatrix.makeRotationFromQuaternion(rot),
            additions.Matrix4.makeRotationFromQuaternion(rot)
        ];
    });
});

QUnit.test("lookAt", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        var eye = new THREE.Vector3(0, 0, 1);
        var centre = new THREE.Vector3(2, 10, 12);
        var up = new THREE.Vector3(0, 1, 0);
        return [
            newThreeMatrix.lookAt(eye, centre, up),
            additions.Matrix4.lookAt(eye, centre, up)
        ];
    });
});

QUnit.test("multiplyMatrices", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        var m1 = new additions.Matrix4.makeTranslation(1, 2, 3);
        var m2 = new additions.Matrix4.makeRotationX(Math.PI / 4);
        return [
            newThreeMatrix.multiplyMatrices(m1, m2),
            additions.Matrix4.multiplyMatrices(m1, m2)
        ];
    });
});

QUnit.test("multiplyToArray", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        var m1 = new additions.Matrix4.makeTranslation(1, 2, 3);
        var m2 = new additions.Matrix4.makeRotationX(Math.PI / 4);
        var a1 = [];
        var a2 = [];

        result = [
            newThreeMatrix.multiplyToArray(m1, m2, a1),
            additions.Matrix4.multiplyToArray(m1, m2, a2)
        ];

        assert.deepEqual(a1, a2, "Additions array should match three.js array");

        return result;
    });
});

QUnit.test("makeTranslation", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        return [
            newThreeMatrix.makeTranslation(1, 2, 3),
            additions.Matrix4.makeTranslation(1, 2, 3)
        ];
    });
});

QUnit.test("makeRotationX", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        return [
            newThreeMatrix.makeRotationX(-Math.PI / 4),
            additions.Matrix4.makeRotationX(-Math.PI / 4)
        ];
    });
});

QUnit.test("makeRotationY", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        return [
            newThreeMatrix.makeRotationY(-Math.PI / 4),
            additions.Matrix4.makeRotationY(-Math.PI / 4)
        ];
    });
});

QUnit.test("makeRotationZ", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        return [
            newThreeMatrix.makeRotationZ(-Math.PI / 4),
            additions.Matrix4.makeRotationZ(-Math.PI / 4)
        ];
    });
});

QUnit.test("makeRotationAxis", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        var axis = new THREE.Vector3(1, 0, 0);
        return [
            newThreeMatrix.makeRotationAxis(axis, -Math.PI / 4),
            additions.Matrix4.makeRotationAxis(axis, -Math.PI / 4)
        ];
    });
});

QUnit.test("makeScale", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        return [
            newThreeMatrix.makeScale(1, 2, 3),
            additions.Matrix4.makeScale(1, 2, 3)
        ];
    });
});

QUnit.test("compose", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        var translation = new THREE.Vector3(10, 20, 30);
        
        var rot = new THREE.Quaternion();
        rot.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

        var scale = new THREE.Vector3(0.5, 0.25, 3);

        return [
            newThreeMatrix.compose(translation, rot, scale),
            additions.Matrix4.compose(translation, rot, scale)
        ];
    });
});

QUnit.test("makeFrustum", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        return [
            newThreeMatrix.makeFrustum(-10, 10, -20, 20, -30, 30),
            additions.Matrix4.makeFrustum(-10, 10, -20, 20, -30, 30)
        ];
    });
});

QUnit.test("makePerspective", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        return [
            newThreeMatrix.makePerspective(Math.PI / 2, 16/9, 1, 100),
            additions.Matrix4.makePerspective(Math.PI / 2, 16/9, 1, 100)
        ];
    });
});

QUnit.test("getInverse", function(assert) {
    var m = (new THREE.Matrix4()).makeRotationY(-Math.PI / 4);
    
    standaloneTestHelper(assert, function (newThreeMatrix) {
        return [
            newThreeMatrix.getInverse(m),
            additions.Matrix4.getInverse(m)
        ];
    });
    
    standaloneTestHelper(assert, function (newThreeMatrix) {
        return [
            newThreeMatrix.getInverse(m),
            (new additions.Matrix4(m)).getInverse()
        ];
    });
});

QUnit.test("makeOrthographic", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        return [
            newThreeMatrix.makeOrthographic(-10, 10, -20, 20, -30, 30),
            additions.Matrix4.makeOrthographic(-10, 10, -20, 20, -30, 30)
        ];
    });
});

QUnit.test("fromArray", function(assert) {
    standaloneTestHelper(assert, function (newThreeMatrix) {
        var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        return [
            newThreeMatrix.fromArray(a),
            additions.Matrix4.fromArray(a)
        ];
    });
});

function vectorAsArray(vector) {
    return [vector.x, vector.y, vector.z];
}

function quaternionAsArray(q) {
    return [q.x, q.y, q.z, q.w];
}

function testHelper(assert, testFunc) {
    var threeExpected = new THREE.Matrix4();
    threeExpected.set(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);

    var unmodifiedExpected = new THREE.Matrix4();
    unmodifiedExpected.copy(threeExpected);

    var additionsMatrix = new additions.Matrix4(threeExpected);

    testFunc(threeExpected, additionsMatrix);

    assert.deepEqual(
        additionsMatrix.elements,
        unmodifiedExpected.elements,
        "Matrix should not be modified when function called"
    );
};

function standaloneTestHelper(assert, matrixGenerator) {
    var result = matrixGenerator(new THREE.Matrix4());
    var threeExpected = result[0];
    var additionsMatrix = result[1];
    assert.deepEqual(
        additionsMatrix.elements,
        threeExpected.elements,
        "Additions matrix should match three.js matrix"
    );
}