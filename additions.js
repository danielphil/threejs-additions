var additions = additions || {};

(function () {
    additions.Matrix4 = function (threejsMatrix) {
        if (!(this instanceof additions.Matrix4)) {
            // http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
            return new (Function.prototype.bind.apply(additions.Matrix4, _.flatten([{}, arguments])));
        }
        
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
        "fromArray"
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
    
    // Functions that require two matrices: [this] and a single input argument.
    // If the user doesn't provide an input argument, then we use [this] as the
    // input and identity as the matrix to operate on
    var newMatrixFunctions = [
        "extractRotation",
        "extractPosition",
        "copyPosition"
    ];
    _(newMatrixFunctions).each(function (name) {
        additions.Matrix4.prototype[name] = function () {
            var newMatrix;
            var inputMatrix;
            if (_.isEmpty(arguments)) {
                newMatrix = new THREE.Matrix4();
                inputMatrix = this.matrix;
            } else {
                newMatrix = newCopy(this.matrix);
                inputMatrix = arguments[0];
            }
            newMatrix[name].apply(newMatrix, [inputMatrix]);
            return new additions.Matrix4(newMatrix);
        }
    });

    // Special case for matrix inverse
    additions.Matrix4.prototype.getInverse = function () {
        return new additions.Matrix4((new THREE.Matrix4()).getInverse(this.matrix));
    };
    
    additions.Matrix4.prototype.toString = function () {
        printMatrix(this);
    };
    
    function printMatrix(m) {
        var e = m.elements;
        console.log(
            e[0] + "\t" + e[4] + '\t' + e[8] + '\t' + e[12] + '\n' +
            e[1] + "\t" + e[5] + '\t' + e[9] + '\t' + e[13] + '\n' +
            e[2] + "\t" + e[6] + '\t' + e[10] + '\t' + e[14] + '\n' +
            e[3] + "\t" + e[7] + '\t' + e[11] + '\t' + e[15]
        );
    }
    
    additions.print = function(obj) {
        if (obj instanceof THREE.Matrix4) {
            printMatrix(obj);
        } else if (obj instanceof additions.Matrix4) {
            printMatrix(obj.matrix);
        }
    };
})();