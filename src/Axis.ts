/// <reference path="../typings/threejs/three.d.ts" />

module additions {
	export class Axis extends THREE.Object3D {
		constructor(scale?: number) {
			super();
			var scale = scale || 1;
			
			this.addAxisToScene(new THREE.Vector3(1, 0, 0), 0xff0000, new THREE.Euler(0, 0, -Math.PI / 2), "x+", scale);
			this.addAxisToScene(new THREE.Vector3(0, 1, 0), 0x00ff00, new THREE.Euler(0, 0, 0), "y+", scale);
			this.addAxisToScene(new THREE.Vector3(0, 0, 1), 0x0000ff, new THREE.Euler(Math.PI / 2, 0, 0), "z+", scale);
		}
		
		private addAxisToScene(
			direction: THREE.Vector3,
			color: number,
			rotation: THREE.Euler,
			label: string,
			scale: number
		) {
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
				var material = new THREE.MeshLambertMaterial({color: color});
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
					color: 0xffffff // CHANGED
				});
		
				var sp = new THREE.Sprite(mat);
				sp.scale.set(1.3 * scale, 1.3 * scale, 1.3 * scale);
		
				var pos = (new THREE.Vector3()).copy(endpoint);
				pos.multiplyScalar(1.2);
				sp.position.copy(pos);
				scene.add(sp);  
			})();
		}
	}
	
	/*
	Axis = function (scale) {
		THREE.Object3D.call(this);
		scale = scale || 1;
		
		addAxisToScene(this, new THREE.Vector3(1, 0, 0), 0xff0000, new THREE.Euler(0, 0, -Math.PI / 2), "x+", scale);
		addAxisToScene(this, new THREE.Vector3(0, 1, 0), 0x00ff00, new THREE.Euler(0, 0, 0), "y+", scale);
		addAxisToScene(this, new THREE.Vector3(0, 0, 1), 0x0000ff, new THREE.Euler(Math.PI / 2, 0, 0), "z+", scale);
		
		function addAxisToScene(scene, direction, color, rotation, label, scale) {
			var endpoint = new THREE.Vector3();
			endpoint.copy(direction).multiplyScalar(scale);
		
			(function () {
				var material = new THREE.LineBasicMaterial({ color: color });
				var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(), endpoint);
				var line = new THREE.Line(geometry, material);
				scene.add(line);
			})();
		
			(function () {
				var material = new THREE.MeshLambertMaterial({color: color});
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
					useScreenCoordinates: false,
					color: 0xffffff // CHANGED
				});
		
				var sp = new THREE.Sprite(mat);
				sp.scale.set(1.3 * scale, 1.3 * scale, 1.3 * scale);
		
				var pos = (new THREE.Vector3()).copy(endpoint);
				pos.multiplyScalar(1.2);
				sp.position.copy(pos);
				scene.add(sp);  
			})();
		}
	};
	
	Axis.prototype = Object.create(THREE.Object3D.prototype);
	Axis.prototype.constructor = Axis;
	*/
}