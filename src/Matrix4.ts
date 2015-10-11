/// <reference path="../typings/threejs/three.d.ts" />

module additions {    
    export interface Matrix4Type {
        elements: Float32Array;
    }
    
    export class Matrix4 {
        matrix: THREE.Matrix4;
        elements: Float32Array;
        
        constructor(
            n11?: additions.Matrix4 | THREE.Matrix4 | number, n12?: number | boolean, n13?: number, n14?: number,
            n21?: number, n22?: number, n23?: number, n24?: number,
            n31?: number, n32?: number, n33?: number, n34?: number,
            n41?: number, n42?: number, n43?: number, n44?: number
        ) {
            if (!(this instanceof additions.Matrix4)) {
                var args = Array.prototype.slice.call(arguments);
                args.unshift({});
                // http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
                return new (Function.prototype.bind.apply(additions.Matrix4, args));
            }
        
            if (arguments.length > 1) {
                // If we've got more than one argument, set the values of the matrix directly
                this.matrix = new THREE.Matrix4();
                this.matrix.set.apply(this.matrix, arguments)
            } else if (n11 && n11 instanceof THREE.Matrix4) {
                // Initialise from the three matrix
                this.matrix = (new THREE.Matrix4()).copy(n11);
            } else if (n11 && n11 instanceof additions.Matrix4) {
                this.matrix = (new THREE.Matrix4()).copy(n11.matrix);
            } else {
                // Set to identity otherwise
                this.matrix = new THREE.Matrix4();
            }
    
            this.elements = this.matrix.elements;
        }
        
        extractBasis(xAxis: THREE.Vector3, yAxis: THREE.Vector3, zAxis: THREE.Vector3)  : additions.Matrix4 {
            this.matrix.extractBasis(xAxis, yAxis, zAxis);
            return this;
        }
        
        applyToVector3Array(a: number[]) : additions.Matrix4 {
            this.matrix.applyToVector3Array(a);
            return this;
        }
        
        determinant() : number {
            return this.matrix.determinant();
        }
        
        flattenToArrayOffset(flat: number[], offset: number) {
            this.matrix.flattenToArrayOffset(flat, offset);
        }
        
        getMaxScaleOnAxis() : number {
            return this.matrix.getMaxScaleOnAxis();
        }
        
        decompose(translation: THREE.Vector3, quaternion: THREE.Quaternion, scale: THREE.Vector3) {
            this.matrix.decompose(translation, quaternion, scale);
        }
        
        toArray() : number[] {
            return this.matrix.toArray();
        }
        
        static identity() : additions.Matrix4 {
            return new additions.Matrix4();
        }
        
        static makeBasis(xAxis: THREE.Vector3, yAxis: THREE.Vector3, zAxis: THREE.Vector3) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.makeBasis(xAxis, yAxis, zAxis);
            return m;
        }
        
        static makeRotationFromEuler(euler: THREE.Euler) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.makeRotationFromEuler(euler);
            return m;
        }
        
        static makeRotationFromQuaternion(q: THREE.Quaternion) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.makeRotationFromQuaternion(q);
            return m;
        }
        
        static lookAt(eye: THREE.Vector3, target: THREE.Vector3, up: THREE.Vector3) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.lookAt(eye, target, up);
            return m;
        }
        
        static multiplyMatrices(a: Matrix4Type, b: Matrix4Type) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.multiplyMatrices(<THREE.Matrix4> a, <THREE.Matrix4> b);
            return m;
        }

        static multiplyToArray(a: Matrix4Type, b: Matrix4Type, r: number[]) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.multiplyToArray(<THREE.Matrix4> a, <THREE.Matrix4> b, r);
            return m;
        }

        static makeTranslation(x: number, y: number, z: number) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.makeTranslation(x, y, z);
            return m;
        }
        
        static makeRotationX(theta: number) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.makeRotationX(theta);
            return m;
        }
        
        static makeRotationY(theta: number) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.makeRotationY(theta);
            return m;
        }
        
        static makeRotationZ(theta: number) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.makeRotationZ(theta);
            return m;
        }
        
        static makeRotationAxis(axis: THREE.Vector3, theta: number) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.makeRotationAxis(axis, theta);
            return m;
        }
        
        static makeScale(x: number, y: number, z: number) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.makeScale(x, y, z);
            return m;
        }
        
        static compose(translation: THREE.Vector3, quaternion: THREE.Quaternion, scale: THREE.Vector3) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.compose(translation, quaternion, scale);
            return m;
        }
        
        static makeFrustum(left: number, right: number, bottom: number, top: number, near: number, far: number) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.makeFrustum(left, right, bottom, top, near, far);
            return m;
        }

        static makePerspective(fov: number, aspect: number, near: number, far: number) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.makePerspective(fov, aspect, near, far);
            return m;
        }
        
        static makeOrthographic(left: number, right: number, top: number, bottom: number, near: number, far: number) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.makeOrthographic(left, right, top, bottom, near, far);
            return m;
        }
        
        static fromArray(array: number[]) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.fromArray(array);
            return m;
        }
               
        static extractRotation(srcMatrix: Matrix4Type) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.extractRotation(Matrix4.extractThreeMatrix(srcMatrix));
            return m;
        }
        
        static copyPosition(srcMatrix: Matrix4Type) : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.copyPosition(Matrix4.extractThreeMatrix(srcMatrix));
            return m;
        }
        
        private static extractThreeMatrix(m: Matrix4Type) : THREE.Matrix4 {
            if (m instanceof THREE.Matrix4) {
                return m; 
            } else if (m instanceof additions.Matrix4) {
                return m.matrix;
            }
            
            return null;
        }
        
        multiply(other: Matrix4Type) : additions.Matrix4 {
            var m = new additions.Matrix4(this.matrix);
            m.matrix.multiply(<THREE.Matrix4>other);
            return m;
        }
        
        multiplyScalar(s: number) : additions.Matrix4 {
            var m = new additions.Matrix4(this.matrix);
            m.matrix.multiplyScalar(s);
            return m;
        }
        
        transpose() : additions.Matrix4 {
            var m = new additions.Matrix4(this.matrix);
            m.matrix.transpose();
            return m;
        }
        
        setPosition(pos: THREE.Vector3) : additions.Matrix4 {
            var m = new additions.Matrix4(this.matrix);
            m.matrix.setPosition(pos);
            return m;
        }
        
        scale(s: THREE.Vector3) : additions.Matrix4 {
            var m = new additions.Matrix4(this.matrix);
            m.matrix.scale(s);
            return m;
        }
        
        getInverse() : additions.Matrix4 {
            var m = new additions.Matrix4();
            m.matrix.getInverse(this.matrix);
            return m;
        }
        
        toString() : string {
            var e : Float32Array = this.matrix.elements;
            return e[0] + "\t" + e[4] + '\t' + e[8] + '\t' + e[12] + '\n' +
                e[1] + "\t" + e[5] + '\t' + e[9] + '\t' + e[13] + '\n' +
                e[2] + "\t" + e[6] + '\t' + e[10] + '\t' + e[14] + '\n' +
                e[3] + "\t" + e[7] + '\t' + e[11] + '\t' + e[15];
        }
    }
}
