/// <reference path="../typings/threejs/three.d.ts" />
declare module additions {
    class Axis extends THREE.Object3D {
        constructor(scale?: number);
        private addAxisToScene(direction, color, rotation, label, scale);
    }
}
declare module additions {
    interface Matrix4Type {
        elements: Float32Array;
    }
    class Matrix4 {
        matrix: THREE.Matrix4;
        elements: Float32Array;
        constructor(n11?: additions.Matrix4 | THREE.Matrix4 | number, n12?: number | boolean, n13?: number, n14?: number, n21?: number, n22?: number, n23?: number, n24?: number, n31?: number, n32?: number, n33?: number, n34?: number, n41?: number, n42?: number, n43?: number, n44?: number);
        extractBasis(xAxis: THREE.Vector3, yAxis: THREE.Vector3, zAxis: THREE.Vector3): additions.Matrix4;
        applyToVector3Array(a: number[]): additions.Matrix4;
        determinant(): number;
        flattenToArrayOffset(flat: number[], offset: number): void;
        getMaxScaleOnAxis(): number;
        decompose(translation: THREE.Vector3, quaternion: THREE.Quaternion, scale: THREE.Vector3): void;
        toArray(): number[];
        static identity(): additions.Matrix4;
        static makeBasis(xAxis: THREE.Vector3, yAxis: THREE.Vector3, zAxis: THREE.Vector3): additions.Matrix4;
        static makeRotationFromEuler(euler: THREE.Euler): additions.Matrix4;
        static makeRotationFromQuaternion(q: THREE.Quaternion): additions.Matrix4;
        static lookAt(eye: THREE.Vector3, target: THREE.Vector3, up: THREE.Vector3): additions.Matrix4;
        static multiplyMatrices(a: Matrix4Type, b: Matrix4Type): additions.Matrix4;
        static multiplyToArray(a: Matrix4Type, b: Matrix4Type, r: number[]): additions.Matrix4;
        static makeTranslation(x: number, y: number, z: number): additions.Matrix4;
        static makeRotationX(theta: number): additions.Matrix4;
        static makeRotationY(theta: number): additions.Matrix4;
        static makeRotationZ(theta: number): additions.Matrix4;
        static makeRotationAxis(axis: THREE.Vector3, theta: number): additions.Matrix4;
        static makeScale(x: number, y: number, z: number): additions.Matrix4;
        static compose(translation: THREE.Vector3, quaternion: THREE.Quaternion, scale: THREE.Vector3): additions.Matrix4;
        static makeFrustum(left: number, right: number, bottom: number, top: number, near: number, far: number): additions.Matrix4;
        static makePerspective(fov: number, aspect: number, near: number, far: number): additions.Matrix4;
        static makeOrthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): additions.Matrix4;
        static fromArray(array: number[]): additions.Matrix4;
        static extractRotation(srcMatrix: Matrix4Type): additions.Matrix4;
        static copyPosition(srcMatrix: Matrix4Type): additions.Matrix4;
        private static extractThreeMatrix(m);
        multiply(other: Matrix4Type): additions.Matrix4;
        multiplyScalar(s: number): additions.Matrix4;
        transpose(): additions.Matrix4;
        setPosition(pos: THREE.Vector3): additions.Matrix4;
        scale(s: THREE.Vector3): additions.Matrix4;
        getInverse(): additions.Matrix4;
        toString(): string;
    }
}
declare module additions {
    function print(m: Matrix4Type): void;
}
