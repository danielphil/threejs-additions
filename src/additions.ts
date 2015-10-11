/// <reference path="Axis.ts" />
/// <reference path="Matrix4.ts" />

module additions {
	export function print(m: Matrix4Type) {
		if (m instanceof THREE.Matrix4) {
			console.log((new additions.Matrix4(m)).toString());
        } else if (m instanceof additions.Matrix4) {
			console.log(m.toString());
        } else {
			console.warn("Need to provide a THREE.Matrix4 or additions.Matrix4!");
			return;
		}
	}
}