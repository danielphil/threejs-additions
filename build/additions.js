/// <reference path="../typings/threejs/three.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var additions;
(function (additions) {
    var Axis = (function (_super) {
        __extends(Axis, _super);
        function Axis(scale) {
            _super.call(this);
            var scale = scale || 1;
            this.addAxisToScene(new THREE.Vector3(1, 0, 0), 0xff0000, new THREE.Euler(0, 0, -Math.PI / 2), "x+", scale);
            this.addAxisToScene(new THREE.Vector3(0, 1, 0), 0x00ff00, new THREE.Euler(0, 0, 0), "y+", scale);
            this.addAxisToScene(new THREE.Vector3(0, 0, 1), 0x0000ff, new THREE.Euler(Math.PI / 2, 0, 0), "z+", scale);
        }
        Axis.prototype.addAxisToScene = function (direction, color, rotation, label, scale) {
            var endpoint = new THREE.Vector3();
            endpoint.copy(direction).multiplyScalar(scale);
            var scene = this;
            (function () {
                var material = new THREE.LineBasicMaterial({ color: color });
                var geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3(), endpoint);
                var line = new THREE.Line(geometry, material);
                scene.add(line);
            })();
            (function () {
                var material = new THREE.MeshLambertMaterial({ color: color });
                var geometry = new THREE.CylinderGeometry(0, 0.05 * scale, 0.2 * scale);
                var cone = new THREE.Mesh(geometry, material);
                cone.position.copy(endpoint);
                cone.rotation.copy(rotation);
                scene.add(cone);
            })();
            (function () {
                var canvas = document.createElement('canvas');
                var size = 256;
                canvas.width = size;
                canvas.height = size;
                var context = canvas.getContext('2d');
                context.fillStyle = '#' + ("000000" + (color & 0xffffff).toString(16)).slice(-6);
                context.textAlign = 'center';
                context.font = '24px Arial';
                context.fillText(label, size / 2, size / 2);
                var amap = new THREE.Texture(canvas);
                amap.needsUpdate = true;
                var mat = new THREE.SpriteMaterial({
                    map: amap,
                    transparent: false,
                    color: 0xffffff
                });
                var sp = new THREE.Sprite(mat);
                sp.scale.set(1.3 * scale, 1.3 * scale, 1.3 * scale);
                var pos = (new THREE.Vector3()).copy(endpoint);
                pos.multiplyScalar(1.2);
                sp.position.copy(pos);
                scene.add(sp);
            })();
        };
        return Axis;
    })(THREE.Object3D);
    additions.Axis = Axis;
})(additions || (additions = {}));
/// <reference path="../typings/threejs/three.d.ts" />
var additions;
(function (additions) {
    var Matrix4 = (function () {
        function Matrix4(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
            if (!(this instanceof additions.Matrix4)) {
                var args = Array.prototype.slice.call(arguments);
                args.unshift({});
                return new (Function.prototype.bind.apply(additions.Matrix4, args));
            }
            if (arguments.length > 1) {
                this.matrix = new THREE.Matrix4();
                this.matrix.set.apply(this.matrix, arguments);
            }
            else if (n11 && n11 instanceof THREE.Matrix4) {
                this.matrix = (new THREE.Matrix4()).copy(n11);
            }
            else if (n11 && n11 instanceof additions.Matrix4) {
                this.matrix = (new THREE.Matrix4()).copy(n11.matrix);
            }
            else {
                this.matrix = new THREE.Matrix4();
            }
            this.elements = this.matrix.elements;
        }
        Matrix4.prototype.extractBasis = function (xAxis, yAxis, zAxis) {
            this.matrix.extractBasis(xAxis, yAxis, zAxis);
            return this;
        };
        Matrix4.prototype.applyToVector3Array = function (a) {
            this.matrix.applyToVector3Array(a);
            return this;
        };
        Matrix4.prototype.determinant = function () {
            return this.matrix.determinant();
        };
        Matrix4.prototype.flattenToArrayOffset = function (flat, offset) {
            this.matrix.flattenToArrayOffset(flat, offset);
        };
        Matrix4.prototype.getMaxScaleOnAxis = function () {
            return this.matrix.getMaxScaleOnAxis();
        };
        Matrix4.prototype.decompose = function (translation, quaternion, scale) {
            this.matrix.decompose(translation, quaternion, scale);
        };
        Matrix4.prototype.toArray = function () {
            return this.matrix.toArray();
        };
        Matrix4.identity = function () {
            return new additions.Matrix4();
        };
        Matrix4.makeBasis = function (xAxis, yAxis, zAxis) {
            var m = new additions.Matrix4();
            m.matrix.makeBasis(xAxis, yAxis, zAxis);
            return m;
        };
        Matrix4.makeRotationFromEuler = function (euler) {
            var m = new additions.Matrix4();
            m.matrix.makeRotationFromEuler(euler);
            return m;
        };
        Matrix4.makeRotationFromQuaternion = function (q) {
            var m = new additions.Matrix4();
            m.matrix.makeRotationFromQuaternion(q);
            return m;
        };
        Matrix4.lookAt = function (eye, target, up) {
            var m = new additions.Matrix4();
            m.matrix.lookAt(eye, target, up);
            return m;
        };
        Matrix4.multiplyMatrices = function (a, b) {
            var m = new additions.Matrix4();
            m.matrix.multiplyMatrices(a, b);
            return m;
        };
        Matrix4.multiplyToArray = function (a, b, r) {
            var m = new additions.Matrix4();
            m.matrix.multiplyToArray(a, b, r);
            return m;
        };
        Matrix4.makeTranslation = function (x, y, z) {
            var m = new additions.Matrix4();
            m.matrix.makeTranslation(x, y, z);
            return m;
        };
        Matrix4.makeRotationX = function (theta) {
            var m = new additions.Matrix4();
            m.matrix.makeRotationX(theta);
            return m;
        };
        Matrix4.makeRotationY = function (theta) {
            var m = new additions.Matrix4();
            m.matrix.makeRotationY(theta);
            return m;
        };
        Matrix4.makeRotationZ = function (theta) {
            var m = new additions.Matrix4();
            m.matrix.makeRotationZ(theta);
            return m;
        };
        Matrix4.makeRotationAxis = function (axis, theta) {
            var m = new additions.Matrix4();
            m.matrix.makeRotationAxis(axis, theta);
            return m;
        };
        Matrix4.makeScale = function (x, y, z) {
            var m = new additions.Matrix4();
            m.matrix.makeScale(x, y, z);
            return m;
        };
        Matrix4.compose = function (translation, quaternion, scale) {
            var m = new additions.Matrix4();
            m.matrix.compose(translation, quaternion, scale);
            return m;
        };
        Matrix4.makeFrustum = function (left, right, bottom, top, near, far) {
            var m = new additions.Matrix4();
            m.matrix.makeFrustum(left, right, bottom, top, near, far);
            return m;
        };
        Matrix4.makePerspective = function (fov, aspect, near, far) {
            var m = new additions.Matrix4();
            m.matrix.makePerspective(fov, aspect, near, far);
            return m;
        };
        Matrix4.makeOrthographic = function (left, right, top, bottom, near, far) {
            var m = new additions.Matrix4();
            m.matrix.makeOrthographic(left, right, top, bottom, near, far);
            return m;
        };
        Matrix4.fromArray = function (array) {
            var m = new additions.Matrix4();
            m.matrix.fromArray(array);
            return m;
        };
        Matrix4.extractRotation = function (srcMatrix) {
            var m = new additions.Matrix4();
            m.matrix.extractRotation(Matrix4.extractThreeMatrix(srcMatrix));
            return m;
        };
        Matrix4.copyPosition = function (srcMatrix) {
            var m = new additions.Matrix4();
            m.matrix.copyPosition(Matrix4.extractThreeMatrix(srcMatrix));
            return m;
        };
        Matrix4.extractThreeMatrix = function (m) {
            if (m instanceof THREE.Matrix4) {
                return m;
            }
            else if (m instanceof additions.Matrix4) {
                return m.matrix;
            }
            return null;
        };
        Matrix4.prototype.multiply = function (other) {
            var m = new additions.Matrix4(this.matrix);
            m.matrix.multiply(other);
            return m;
        };
        Matrix4.prototype.multiplyScalar = function (s) {
            var m = new additions.Matrix4(this.matrix);
            m.matrix.multiplyScalar(s);
            return m;
        };
        Matrix4.prototype.transpose = function () {
            var m = new additions.Matrix4(this.matrix);
            m.matrix.transpose();
            return m;
        };
        Matrix4.prototype.setPosition = function (pos) {
            var m = new additions.Matrix4(this.matrix);
            m.matrix.setPosition(pos);
            return m;
        };
        Matrix4.prototype.scale = function (s) {
            var m = new additions.Matrix4(this.matrix);
            m.matrix.scale(s);
            return m;
        };
        Matrix4.prototype.getInverse = function () {
            var m = new additions.Matrix4();
            m.matrix.getInverse(this.matrix);
            return m;
        };
        Matrix4.prototype.toString = function () {
            var e = this.matrix.elements;
            return e[0] + "\t" + e[4] + '\t' + e[8] + '\t' + e[12] + '\n' +
                e[1] + "\t" + e[5] + '\t' + e[9] + '\t' + e[13] + '\n' +
                e[2] + "\t" + e[6] + '\t' + e[10] + '\t' + e[14] + '\n' +
                e[3] + "\t" + e[7] + '\t' + e[11] + '\t' + e[15];
        };
        return Matrix4;
    })();
    additions.Matrix4 = Matrix4;
})(additions || (additions = {}));
/// <reference path="Axis.ts" />
/// <reference path="Matrix4.ts" />
var additions;
(function (additions) {
    function print(m) {
        if (m instanceof THREE.Matrix4) {
            console.log((new additions.Matrix4(m)).toString());
        }
        else if (m instanceof additions.Matrix4) {
            console.log(m.toString());
        }
        else {
            console.warn("Need to provide a THREE.Matrix4 or additions.Matrix4!");
            return;
        }
    }
    additions.print = print;
})(additions || (additions = {}));
//# sourceMappingURL=additions.js.map