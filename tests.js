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