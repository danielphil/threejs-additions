var additions = additions || {};

(function () {
    additions.Matrix4 = function (threejsMatrix) {
        if (arguments.length > 1) {
            // If we've got more than one argument, set the values of the matrix directly
            this.matrix = new THREE.Matrix4();
            this.matrix.set.apply(this.matrix, arguments)
        } else if (threejsMatrix) {
            // Initialise from the three matrix
            this.matrix = newCopy(threejsMatrix);
        } else {
            // Set to identity otherwise
            this.matrix = new THREE.Matrix4();
        }

        this.elements = this.matrix.elements;
    };

    function newCopy(m) {
        return (new THREE.Matrix4()).copy(m);
    }

    // Functions that can be called directly because they don't modify the matrix
    var passthroughFunctions = [
        "extractBasis",
        "applyToVector3Array",
        "determinant",
        "flattenToArrayOffset",
        "getMaxScaleOnAxis",
        "decompose",
        "toArray"
    ];
    _(passthroughFunctions).each(function (name) {
        additions.Matrix4.prototype[name] = function () {
            return this.matrix[name].apply(this.matrix, arguments);
        }
    });

    // Functions which don't require a source matrix
    var standaloneFunctions = [
        "identity",
        "makeBasis",
        "makeRotationFromEuler",
        "makeRotationFromQuaternion",
        "lookAt",
        "multiplyMatrices",
        "multiplyToArray",
        "makeTranslation",
        "makeRotationX",
        "makeRotationY",
        "makeRotationZ",
        "makeRotationAxis",
        "makeScale",
        "compose",
        "makeFrustum",
        "makePerspective",
        "makeOrthographic",
        "fromArray",
        "getInverse"
    ];
    _(standaloneFunctions).each(function (name) {
        additions.Matrix4[name] = function () {
            var newMatrix = new THREE.Matrix4();
            newMatrix[name].apply(newMatrix, arguments);
            return new additions.Matrix4(newMatrix);
        }
    });

    // Functions that include the current matrix as an input
    var newMatrixFunctions = [
        "extractPosition",
        "copyPosition",
        "extractRotation",
        "multiply",
        "multiplyScalar",
        "transpose",
        "setPosition",
        "scale",
        "getInverse"
    ];
    _(newMatrixFunctions).each(function (name) {
        additions.Matrix4.prototype[name] = function () {
            var newMatrix = newCopy(this.matrix);
            newMatrix[name].apply(newMatrix, arguments);
            return new additions.Matrix4(newMatrix);
        }
    });

    // Special case for matrix inverse
    additions.Matrix4.prototype.getInverse = function () {
        return new additions.Matrix4((new THREE.Matrix4()).getInverse(this.matrix));
    };
})();