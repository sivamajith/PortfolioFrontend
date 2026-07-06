import{r as E,_ as fe,u as ot,j as R}from"./index-20721255.js";import{R as Pt,V as _,Q as Ge,P as Ee,O as we,S as Ze,b as z,M as q,T as $,c as Mt,d as Tt,I as Dt,F as Xe,e as Ae,f as Q,W as jt,g as Le,h as st,i as Ct,U as Ke,j as qe,k as Ut,l as J,m as zt,n as Rt,L as It,o as V,p as Nt,E as Bt,u as at,C as Ft}from"./react-three-fiber.esm-58e19fe1.js";const rt=(()=>parseInt(Pt.replace(/\D+/g,"")))(),ct=rt>=125?"uv1":"uv2";var Ht=Object.defineProperty,kt=(d,n,i)=>n in d?Ht(d,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):d[n]=i,Wt=(d,n,i)=>(kt(d,typeof n!="symbol"?n+"":n,i),i);class Yt{constructor(){Wt(this,"_listeners")}addEventListener(n,i){this._listeners===void 0&&(this._listeners={});const e=this._listeners;e[n]===void 0&&(e[n]=[]),e[n].indexOf(i)===-1&&e[n].push(i)}hasEventListener(n,i){if(this._listeners===void 0)return!1;const e=this._listeners;return e[n]!==void 0&&e[n].indexOf(i)!==-1}removeEventListener(n,i){if(this._listeners===void 0)return;const o=this._listeners[n];if(o!==void 0){const a=o.indexOf(i);a!==-1&&o.splice(a,1)}}dispatchEvent(n){if(this._listeners===void 0)return;const e=this._listeners[n.type];if(e!==void 0){n.target=this;const o=e.slice(0);for(let a=0,m=o.length;a<m;a++)o[a].call(this,n);n.target=null}}}var Vt=Object.defineProperty,Gt=(d,n,i)=>n in d?Vt(d,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):d[n]=i,c=(d,n,i)=>(Gt(d,typeof n!="symbol"?n+"":n,i),i);const ce=new Mt,$e=new Tt,Zt=Math.cos(70*(Math.PI/180)),Qe=(d,n)=>(d%n+n)%n;let Xt=class extends Yt{constructor(n,i){super(),c(this,"object"),c(this,"domElement"),c(this,"enabled",!0),c(this,"target",new _),c(this,"minDistance",0),c(this,"maxDistance",1/0),c(this,"minZoom",0),c(this,"maxZoom",1/0),c(this,"minPolarAngle",0),c(this,"maxPolarAngle",Math.PI),c(this,"minAzimuthAngle",-1/0),c(this,"maxAzimuthAngle",1/0),c(this,"enableDamping",!1),c(this,"dampingFactor",.05),c(this,"enableZoom",!0),c(this,"zoomSpeed",1),c(this,"enableRotate",!0),c(this,"rotateSpeed",1),c(this,"enablePan",!0),c(this,"panSpeed",1),c(this,"screenSpacePanning",!0),c(this,"keyPanSpeed",7),c(this,"zoomToCursor",!1),c(this,"autoRotate",!1),c(this,"autoRotateSpeed",2),c(this,"reverseOrbit",!1),c(this,"reverseHorizontalOrbit",!1),c(this,"reverseVerticalOrbit",!1),c(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),c(this,"mouseButtons",{LEFT:q.ROTATE,MIDDLE:q.DOLLY,RIGHT:q.PAN}),c(this,"touches",{ONE:$.ROTATE,TWO:$.DOLLY_PAN}),c(this,"target0"),c(this,"position0"),c(this,"zoom0"),c(this,"_domElementKeyEvents",null),c(this,"getPolarAngle"),c(this,"getAzimuthalAngle"),c(this,"setPolarAngle"),c(this,"setAzimuthalAngle"),c(this,"getDistance"),c(this,"getZoomScale"),c(this,"listenToKeyEvents"),c(this,"stopListenToKeyEvents"),c(this,"saveState"),c(this,"reset"),c(this,"update"),c(this,"connect"),c(this,"dispose"),c(this,"dollyIn"),c(this,"dollyOut"),c(this,"getScale"),c(this,"setScale"),this.object=n,this.domElement=i,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>f.phi,this.getAzimuthalAngle=()=>f.theta,this.setPolarAngle=t=>{let s=Qe(t,2*Math.PI),l=f.phi;l<0&&(l+=2*Math.PI),s<0&&(s+=2*Math.PI);let g=Math.abs(s-l);2*Math.PI-g<g&&(s<l?s+=2*Math.PI:l+=2*Math.PI),h.phi=s-l,e.update()},this.setAzimuthalAngle=t=>{let s=Qe(t,2*Math.PI),l=f.theta;l<0&&(l+=2*Math.PI),s<0&&(s+=2*Math.PI);let g=Math.abs(s-l);2*Math.PI-g<g&&(s<l?s+=2*Math.PI:l+=2*Math.PI),h.theta=s-l,e.update()},this.getDistance=()=>e.object.position.distanceTo(e.target),this.listenToKeyEvents=t=>{t.addEventListener("keydown",ve),this._domElementKeyEvents=t},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ve),this._domElementKeyEvents=null},this.saveState=()=>{e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=()=>{e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(o),e.update(),u=r.NONE},this.update=(()=>{const t=new _,s=new _(0,1,0),l=new Ge().setFromUnitVectors(n.up,s),g=l.clone().invert(),A=new _,k=new Ge,G=2*Math.PI;return function(){const Ve=e.object.position;l.setFromUnitVectors(n.up,s),g.copy(l).invert(),t.copy(Ve).sub(e.target),t.applyQuaternion(l),f.setFromVector3(t),e.autoRotate&&u===r.NONE&&pe(dt()),e.enableDamping?(f.theta+=h.theta*e.dampingFactor,f.phi+=h.phi*e.dampingFactor):(f.theta+=h.theta,f.phi+=h.phi);let W=e.minAzimuthAngle,Y=e.maxAzimuthAngle;isFinite(W)&&isFinite(Y)&&(W<-Math.PI?W+=G:W>Math.PI&&(W-=G),Y<-Math.PI?Y+=G:Y>Math.PI&&(Y-=G),W<=Y?f.theta=Math.max(W,Math.min(Y,f.theta)):f.theta=f.theta>(W+Y)/2?Math.max(W,f.theta):Math.min(Y,f.theta)),f.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,f.phi)),f.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(C,e.dampingFactor):e.target.add(C),e.zoomToCursor&&N||e.object.isOrthographicCamera?f.radius=ge(f.radius):f.radius=ge(f.radius*w),t.setFromSpherical(f),t.applyQuaternion(g),Ve.copy(e.target).add(t),e.object.matrixAutoUpdate||e.object.updateMatrix(),e.object.lookAt(e.target),e.enableDamping===!0?(h.theta*=1-e.dampingFactor,h.phi*=1-e.dampingFactor,C.multiplyScalar(1-e.dampingFactor)):(h.set(0,0,0),C.set(0,0,0));let ne=!1;if(e.zoomToCursor&&N){let ie=null;if(e.object instanceof Ee&&e.object.isPerspectiveCamera){const oe=t.length();ie=ge(oe*w);const re=oe-ie;e.object.position.addScaledVector(ee,re),e.object.updateMatrixWorld()}else if(e.object.isOrthographicCamera){const oe=new _(I.x,I.y,0);oe.unproject(e.object),e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/w)),e.object.updateProjectionMatrix(),ne=!0;const re=new _(I.x,I.y,0);re.unproject(e.object),e.object.position.sub(re).add(oe),e.object.updateMatrixWorld(),ie=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;ie!==null&&(e.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(ie).add(e.object.position):(ce.origin.copy(e.object.position),ce.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(ce.direction))<Zt?n.lookAt(e.target):($e.setFromNormalAndCoplanarPoint(e.object.up,e.target),ce.intersectPlane($e,e.target))))}else e.object instanceof we&&e.object.isOrthographicCamera&&(ne=w!==1,ne&&(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/w)),e.object.updateProjectionMatrix()));return w=1,N=!1,ne||A.distanceToSquared(e.object.position)>S||8*(1-k.dot(e.object.quaternion))>S?(e.dispatchEvent(o),A.copy(e.object.position),k.copy(e.object.quaternion),ne=!1,!0):!1}})(),this.connect=t=>{e.domElement=t,e.domElement.style.touchAction="none",e.domElement.addEventListener("contextmenu",We),e.domElement.addEventListener("pointerdown",He),e.domElement.addEventListener("pointercancel",te),e.domElement.addEventListener("wheel",ke)},this.dispose=()=>{var t,s,l,g,A,k;e.domElement&&(e.domElement.style.touchAction="auto"),(t=e.domElement)==null||t.removeEventListener("contextmenu",We),(s=e.domElement)==null||s.removeEventListener("pointerdown",He),(l=e.domElement)==null||l.removeEventListener("pointercancel",te),(g=e.domElement)==null||g.removeEventListener("wheel",ke),(A=e.domElement)==null||A.ownerDocument.removeEventListener("pointermove",be),(k=e.domElement)==null||k.ownerDocument.removeEventListener("pointerup",te),e._domElementKeyEvents!==null&&e._domElementKeyEvents.removeEventListener("keydown",ve)};const e=this,o={type:"change"},a={type:"start"},m={type:"end"},r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let u=r.NONE;const S=1e-6,f=new Ze,h=new Ze;let w=1;const C=new _,L=new z,D=new z,j=new z,O=new z,U=new z,p=new z,y=new z,x=new z,v=new z,ee=new _,I=new z;let N=!1;const b=[],se={};function dt(){return 2*Math.PI/60/60*e.autoRotateSpeed}function Z(){return Math.pow(.95,e.zoomSpeed)}function pe(t){e.reverseOrbit||e.reverseHorizontalOrbit?h.theta+=t:h.theta-=t}function Me(t){e.reverseOrbit||e.reverseVerticalOrbit?h.phi+=t:h.phi-=t}const Te=(()=>{const t=new _;return function(l,g){t.setFromMatrixColumn(g,0),t.multiplyScalar(-l),C.add(t)}})(),De=(()=>{const t=new _;return function(l,g){e.screenSpacePanning===!0?t.setFromMatrixColumn(g,1):(t.setFromMatrixColumn(g,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(l),C.add(t)}})(),K=(()=>{const t=new _;return function(l,g){const A=e.domElement;if(A&&e.object instanceof Ee&&e.object.isPerspectiveCamera){const k=e.object.position;t.copy(k).sub(e.target);let G=t.length();G*=Math.tan(e.object.fov/2*Math.PI/180),Te(2*l*G/A.clientHeight,e.object.matrix),De(2*g*G/A.clientHeight,e.object.matrix)}else A&&e.object instanceof we&&e.object.isOrthographicCamera?(Te(l*(e.object.right-e.object.left)/e.object.zoom/A.clientWidth,e.object.matrix),De(g*(e.object.top-e.object.bottom)/e.object.zoom/A.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}})();function he(t){e.object instanceof Ee&&e.object.isPerspectiveCamera||e.object instanceof we&&e.object.isOrthographicCamera?w=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function ae(t){he(w/t)}function me(t){he(w*t)}function je(t){if(!e.zoomToCursor||!e.domElement)return;N=!0;const s=e.domElement.getBoundingClientRect(),l=t.clientX-s.left,g=t.clientY-s.top,A=s.width,k=s.height;I.x=l/A*2-1,I.y=-(g/k)*2+1,ee.set(I.x,I.y,1).unproject(e.object).sub(e.object.position).normalize()}function ge(t){return Math.max(e.minDistance,Math.min(e.maxDistance,t))}function Ce(t){L.set(t.clientX,t.clientY)}function ft(t){je(t),y.set(t.clientX,t.clientY)}function Ue(t){O.set(t.clientX,t.clientY)}function pt(t){D.set(t.clientX,t.clientY),j.subVectors(D,L).multiplyScalar(e.rotateSpeed);const s=e.domElement;s&&(pe(2*Math.PI*j.x/s.clientHeight),Me(2*Math.PI*j.y/s.clientHeight)),L.copy(D),e.update()}function ht(t){x.set(t.clientX,t.clientY),v.subVectors(x,y),v.y>0?ae(Z()):v.y<0&&me(Z()),y.copy(x),e.update()}function mt(t){U.set(t.clientX,t.clientY),p.subVectors(U,O).multiplyScalar(e.panSpeed),K(p.x,p.y),O.copy(U),e.update()}function gt(t){je(t),t.deltaY<0?me(Z()):t.deltaY>0&&ae(Z()),e.update()}function bt(t){let s=!1;switch(t.code){case e.keys.UP:K(0,e.keyPanSpeed),s=!0;break;case e.keys.BOTTOM:K(0,-e.keyPanSpeed),s=!0;break;case e.keys.LEFT:K(e.keyPanSpeed,0),s=!0;break;case e.keys.RIGHT:K(-e.keyPanSpeed,0),s=!0;break}s&&(t.preventDefault(),e.update())}function ze(){if(b.length==1)L.set(b[0].pageX,b[0].pageY);else{const t=.5*(b[0].pageX+b[1].pageX),s=.5*(b[0].pageY+b[1].pageY);L.set(t,s)}}function Re(){if(b.length==1)O.set(b[0].pageX,b[0].pageY);else{const t=.5*(b[0].pageX+b[1].pageX),s=.5*(b[0].pageY+b[1].pageY);O.set(t,s)}}function Ie(){const t=b[0].pageX-b[1].pageX,s=b[0].pageY-b[1].pageY,l=Math.sqrt(t*t+s*s);y.set(0,l)}function vt(){e.enableZoom&&Ie(),e.enablePan&&Re()}function yt(){e.enableZoom&&Ie(),e.enableRotate&&ze()}function Ne(t){if(b.length==1)D.set(t.pageX,t.pageY);else{const l=ye(t),g=.5*(t.pageX+l.x),A=.5*(t.pageY+l.y);D.set(g,A)}j.subVectors(D,L).multiplyScalar(e.rotateSpeed);const s=e.domElement;s&&(pe(2*Math.PI*j.x/s.clientHeight),Me(2*Math.PI*j.y/s.clientHeight)),L.copy(D)}function Be(t){if(b.length==1)U.set(t.pageX,t.pageY);else{const s=ye(t),l=.5*(t.pageX+s.x),g=.5*(t.pageY+s.y);U.set(l,g)}p.subVectors(U,O).multiplyScalar(e.panSpeed),K(p.x,p.y),O.copy(U)}function Fe(t){const s=ye(t),l=t.pageX-s.x,g=t.pageY-s.y,A=Math.sqrt(l*l+g*g);x.set(0,A),v.set(0,Math.pow(x.y/y.y,e.zoomSpeed)),ae(v.y),y.copy(x)}function Et(t){e.enableZoom&&Fe(t),e.enablePan&&Be(t)}function wt(t){e.enableZoom&&Fe(t),e.enableRotate&&Ne(t)}function He(t){var s,l;e.enabled!==!1&&(b.length===0&&((s=e.domElement)==null||s.ownerDocument.addEventListener("pointermove",be),(l=e.domElement)==null||l.ownerDocument.addEventListener("pointerup",te)),Lt(t),t.pointerType==="touch"?_t(t):xt(t))}function be(t){e.enabled!==!1&&(t.pointerType==="touch"?At(t):St(t))}function te(t){var s,l,g;Ot(t),b.length===0&&((s=e.domElement)==null||s.releasePointerCapture(t.pointerId),(l=e.domElement)==null||l.ownerDocument.removeEventListener("pointermove",be),(g=e.domElement)==null||g.ownerDocument.removeEventListener("pointerup",te)),e.dispatchEvent(m),u=r.NONE}function xt(t){let s;switch(t.button){case 0:s=e.mouseButtons.LEFT;break;case 1:s=e.mouseButtons.MIDDLE;break;case 2:s=e.mouseButtons.RIGHT;break;default:s=-1}switch(s){case q.DOLLY:if(e.enableZoom===!1)return;ft(t),u=r.DOLLY;break;case q.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;Ue(t),u=r.PAN}else{if(e.enableRotate===!1)return;Ce(t),u=r.ROTATE}break;case q.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;Ce(t),u=r.ROTATE}else{if(e.enablePan===!1)return;Ue(t),u=r.PAN}break;default:u=r.NONE}u!==r.NONE&&e.dispatchEvent(a)}function St(t){if(e.enabled!==!1)switch(u){case r.ROTATE:if(e.enableRotate===!1)return;pt(t);break;case r.DOLLY:if(e.enableZoom===!1)return;ht(t);break;case r.PAN:if(e.enablePan===!1)return;mt(t);break}}function ke(t){e.enabled===!1||e.enableZoom===!1||u!==r.NONE&&u!==r.ROTATE||(t.preventDefault(),e.dispatchEvent(a),gt(t),e.dispatchEvent(m))}function ve(t){e.enabled===!1||e.enablePan===!1||bt(t)}function _t(t){switch(Ye(t),b.length){case 1:switch(e.touches.ONE){case $.ROTATE:if(e.enableRotate===!1)return;ze(),u=r.TOUCH_ROTATE;break;case $.PAN:if(e.enablePan===!1)return;Re(),u=r.TOUCH_PAN;break;default:u=r.NONE}break;case 2:switch(e.touches.TWO){case $.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;vt(),u=r.TOUCH_DOLLY_PAN;break;case $.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;yt(),u=r.TOUCH_DOLLY_ROTATE;break;default:u=r.NONE}break;default:u=r.NONE}u!==r.NONE&&e.dispatchEvent(a)}function At(t){switch(Ye(t),u){case r.TOUCH_ROTATE:if(e.enableRotate===!1)return;Ne(t),e.update();break;case r.TOUCH_PAN:if(e.enablePan===!1)return;Be(t),e.update();break;case r.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Et(t),e.update();break;case r.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;wt(t),e.update();break;default:u=r.NONE}}function We(t){e.enabled!==!1&&t.preventDefault()}function Lt(t){b.push(t)}function Ot(t){delete se[t.pointerId];for(let s=0;s<b.length;s++)if(b[s].pointerId==t.pointerId){b.splice(s,1);return}}function Ye(t){let s=se[t.pointerId];s===void 0&&(s=new z,se[t.pointerId]=s),s.set(t.pageX,t.pageY)}function ye(t){const s=t.pointerId===b[0].pointerId?b[1]:b[0];return se[s.pointerId]}this.dollyIn=(t=Z())=>{me(t),e.update()},this.dollyOut=(t=Z())=>{ae(t),e.update()},this.getScale=()=>w,this.setScale=t=>{he(t),e.update()},this.getZoomScale=()=>Z(),i!==void 0&&this.connect(i),this.update()}};const Je=new Le,le=new _;class Oe extends Dt{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const n=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],i=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],e=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(e),this.setAttribute("position",new Xe(n,3)),this.setAttribute("uv",new Xe(i,2))}applyMatrix4(n){const i=this.attributes.instanceStart,e=this.attributes.instanceEnd;return i!==void 0&&(i.applyMatrix4(n),e.applyMatrix4(n),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(n){let i;n instanceof Float32Array?i=n:Array.isArray(n)&&(i=new Float32Array(n));const e=new Ae(i,6,1);return this.setAttribute("instanceStart",new Q(e,3,0)),this.setAttribute("instanceEnd",new Q(e,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(n,i=3){let e;n instanceof Float32Array?e=n:Array.isArray(n)&&(e=new Float32Array(n));const o=new Ae(e,i*2,1);return this.setAttribute("instanceColorStart",new Q(o,i,0)),this.setAttribute("instanceColorEnd",new Q(o,i,i)),this}fromWireframeGeometry(n){return this.setPositions(n.attributes.position.array),this}fromEdgesGeometry(n){return this.setPositions(n.attributes.position.array),this}fromMesh(n){return this.fromWireframeGeometry(new jt(n.geometry)),this}fromLineSegments(n){const i=n.geometry;return this.setPositions(i.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Le);const n=this.attributes.instanceStart,i=this.attributes.instanceEnd;n!==void 0&&i!==void 0&&(this.boundingBox.setFromBufferAttribute(n),Je.setFromBufferAttribute(i),this.boundingBox.union(Je))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new st),this.boundingBox===null&&this.computeBoundingBox();const n=this.attributes.instanceStart,i=this.attributes.instanceEnd;if(n!==void 0&&i!==void 0){const e=this.boundingSphere.center;this.boundingBox.getCenter(e);let o=0;for(let a=0,m=n.count;a<m;a++)le.fromBufferAttribute(n,a),o=Math.max(o,e.distanceToSquared(le)),le.fromBufferAttribute(i,a),o=Math.max(o,e.distanceToSquared(le));this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(n){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(n)}}class lt extends Oe{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(n){const i=n.length-3,e=new Float32Array(2*i);for(let o=0;o<i;o+=3)e[2*o]=n[o],e[2*o+1]=n[o+1],e[2*o+2]=n[o+2],e[2*o+3]=n[o+3],e[2*o+4]=n[o+4],e[2*o+5]=n[o+5];return super.setPositions(e),this}setColors(n,i=3){const e=n.length-i,o=new Float32Array(2*e);if(i===3)for(let a=0;a<e;a+=i)o[2*a]=n[a],o[2*a+1]=n[a+1],o[2*a+2]=n[a+2],o[2*a+3]=n[a+3],o[2*a+4]=n[a+4],o[2*a+5]=n[a+5];else for(let a=0;a<e;a+=i)o[2*a]=n[a],o[2*a+1]=n[a+1],o[2*a+2]=n[a+2],o[2*a+3]=n[a+3],o[2*a+4]=n[a+4],o[2*a+5]=n[a+5],o[2*a+6]=n[a+6],o[2*a+7]=n[a+7];return super.setColors(o,i),this}fromLine(n){const i=n.geometry;return this.setPositions(i.attributes.position.array),this}}class Pe extends Ct{constructor(n){super({type:"LineMaterial",uniforms:Ke.clone(Ke.merge([qe.common,qe.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new z(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${rt>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(i){this.uniforms.diffuse.value=i}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(i){i===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(i){this.uniforms.linewidth.value=i}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(i){!!i!="USE_DASH"in this.defines&&(this.needsUpdate=!0),i===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(i){this.uniforms.dashScale.value=i}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(i){this.uniforms.dashSize.value=i}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(i){this.uniforms.dashOffset.value=i}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(i){this.uniforms.gapSize.value=i}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(i){this.uniforms.opacity.value=i}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(i){this.uniforms.resolution.value.copy(i)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(i){!!i!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),i===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(n)}}const xe=new J,et=new _,tt=new _,P=new J,M=new J,B=new J,Se=new _,_e=new Rt,T=new It,nt=new _,ue=new Le,de=new st,F=new J;let H,X;function it(d,n,i){return F.set(0,0,-n,1).applyMatrix4(d.projectionMatrix),F.multiplyScalar(1/F.w),F.x=X/i.width,F.y=X/i.height,F.applyMatrix4(d.projectionMatrixInverse),F.multiplyScalar(1/F.w),Math.abs(Math.max(F.x,F.y))}function Kt(d,n){const i=d.matrixWorld,e=d.geometry,o=e.attributes.instanceStart,a=e.attributes.instanceEnd,m=Math.min(e.instanceCount,o.count);for(let r=0,u=m;r<u;r++){T.start.fromBufferAttribute(o,r),T.end.fromBufferAttribute(a,r),T.applyMatrix4(i);const S=new _,f=new _;H.distanceSqToSegment(T.start,T.end,f,S),f.distanceTo(S)<X*.5&&n.push({point:f,pointOnLine:S,distance:H.origin.distanceTo(f),object:d,face:null,faceIndex:r,uv:null,[ct]:null})}}function qt(d,n,i){const e=n.projectionMatrix,a=d.material.resolution,m=d.matrixWorld,r=d.geometry,u=r.attributes.instanceStart,S=r.attributes.instanceEnd,f=Math.min(r.instanceCount,u.count),h=-n.near;H.at(1,B),B.w=1,B.applyMatrix4(n.matrixWorldInverse),B.applyMatrix4(e),B.multiplyScalar(1/B.w),B.x*=a.x/2,B.y*=a.y/2,B.z=0,Se.copy(B),_e.multiplyMatrices(n.matrixWorldInverse,m);for(let w=0,C=f;w<C;w++){if(P.fromBufferAttribute(u,w),M.fromBufferAttribute(S,w),P.w=1,M.w=1,P.applyMatrix4(_e),M.applyMatrix4(_e),P.z>h&&M.z>h)continue;if(P.z>h){const p=P.z-M.z,y=(P.z-h)/p;P.lerp(M,y)}else if(M.z>h){const p=M.z-P.z,y=(M.z-h)/p;M.lerp(P,y)}P.applyMatrix4(e),M.applyMatrix4(e),P.multiplyScalar(1/P.w),M.multiplyScalar(1/M.w),P.x*=a.x/2,P.y*=a.y/2,M.x*=a.x/2,M.y*=a.y/2,T.start.copy(P),T.start.z=0,T.end.copy(M),T.end.z=0;const D=T.closestPointToPointParameter(Se,!0);T.at(D,nt);const j=zt.lerp(P.z,M.z,D),O=j>=-1&&j<=1,U=Se.distanceTo(nt)<X*.5;if(O&&U){T.start.fromBufferAttribute(u,w),T.end.fromBufferAttribute(S,w),T.start.applyMatrix4(m),T.end.applyMatrix4(m);const p=new _,y=new _;H.distanceSqToSegment(T.start,T.end,y,p),i.push({point:y,pointOnLine:p,distance:H.origin.distanceTo(y),object:d,face:null,faceIndex:w,uv:null,[ct]:null})}}}class ut extends Ut{constructor(n=new Oe,i=new Pe({color:Math.random()*16777215})){super(n,i),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const n=this.geometry,i=n.attributes.instanceStart,e=n.attributes.instanceEnd,o=new Float32Array(2*i.count);for(let m=0,r=0,u=i.count;m<u;m++,r+=2)et.fromBufferAttribute(i,m),tt.fromBufferAttribute(e,m),o[r]=r===0?0:o[r-1],o[r+1]=o[r]+et.distanceTo(tt);const a=new Ae(o,2,1);return n.setAttribute("instanceDistanceStart",new Q(a,1,0)),n.setAttribute("instanceDistanceEnd",new Q(a,1,1)),this}raycast(n,i){const e=this.material.worldUnits,o=n.camera;o===null&&!e&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const a=n.params.Line2!==void 0&&n.params.Line2.threshold||0;H=n.ray;const m=this.matrixWorld,r=this.geometry,u=this.material;X=u.linewidth+a,r.boundingSphere===null&&r.computeBoundingSphere(),de.copy(r.boundingSphere).applyMatrix4(m);let S;if(e)S=X*.5;else{const h=Math.max(o.near,de.distanceToPoint(H.origin));S=it(o,h,u.resolution)}if(de.radius+=S,H.intersectsSphere(de)===!1)return;r.boundingBox===null&&r.computeBoundingBox(),ue.copy(r.boundingBox).applyMatrix4(m);let f;if(e)f=X*.5;else{const h=Math.max(o.near,ue.distanceToPoint(H.origin));f=it(o,h,u.resolution)}ue.expandByScalar(f),H.intersectsBox(ue)!==!1&&(e?Kt(this,i):qt(this,o,i))}onBeforeRender(n){const i=this.material.uniforms;i&&i.resolution&&(n.getViewport(xe),this.material.uniforms.resolution.value.set(xe.z,xe.w))}}class $t extends ut{constructor(n=new lt,i=new Pe({color:Math.random()*16777215})){super(n,i),this.isLine2=!0,this.type="Line2"}}const Qt=E.forwardRef(function({points:n,color:i=16777215,vertexColors:e,linewidth:o,lineWidth:a,segments:m,dashed:r,...u},S){var f,h;const w=V(O=>O.size),C=E.useMemo(()=>m?new ut:new $t,[m]),[L]=E.useState(()=>new Pe),D=(e==null||(f=e[0])==null?void 0:f.length)===4?4:3,j=E.useMemo(()=>{const O=m?new Oe:new lt,U=n.map(p=>{const y=Array.isArray(p);return p instanceof _||p instanceof J?[p.x,p.y,p.z]:p instanceof z?[p.x,p.y,0]:y&&p.length===3?[p[0],p[1],p[2]]:y&&p.length===2?[p[0],p[1],0]:p});if(O.setPositions(U.flat()),e){i=16777215;const p=e.map(y=>y instanceof Nt?y.toArray():y);O.setColors(p.flat(),D)}return O},[n,m,e,D]);return E.useLayoutEffect(()=>{C.computeLineDistances()},[n,C]),E.useLayoutEffect(()=>{r?L.defines.USE_DASH="":delete L.defines.USE_DASH,L.needsUpdate=!0},[r,L]),E.useEffect(()=>()=>{j.dispose(),L.dispose()},[j]),E.createElement("primitive",fe({object:C,ref:S},u),E.createElement("primitive",{object:j,attach:"geometry"}),E.createElement("primitive",fe({object:L,attach:"material",color:i,vertexColors:!!e,resolution:[w.width,w.height],linewidth:(h=o??a)!==null&&h!==void 0?h:1,dashed:r,transparent:D===4},u)))}),Jt=E.forwardRef(({threshold:d=15,geometry:n,...i},e)=>{const o=E.useRef(null);E.useImperativeHandle(e,()=>o.current,[]);const a=E.useMemo(()=>[0,0,0,1,0,0],[]),m=E.useRef(),r=E.useRef();return E.useLayoutEffect(()=>{const u=o.current.parent,S=n??(u==null?void 0:u.geometry);if(!S||m.current===S&&r.current===d)return;m.current=S,r.current=d;const h=new Bt(S,d).attributes.position.array;o.current.geometry.setPositions(h),o.current.geometry.attributes.instanceStart.needsUpdate=!0,o.current.geometry.attributes.instanceEnd.needsUpdate=!0,o.current.computeLineDistances()}),E.createElement(Qt,fe({segments:!0,points:a,ref:o,raycast:()=>null},i))}),en=E.forwardRef(({makeDefault:d,camera:n,regress:i,domElement:e,enableDamping:o=!0,keyEvents:a=!1,onChange:m,onStart:r,onEnd:u,...S},f)=>{const h=V(v=>v.invalidate),w=V(v=>v.camera),C=V(v=>v.gl),L=V(v=>v.events),D=V(v=>v.setEvents),j=V(v=>v.set),O=V(v=>v.get),U=V(v=>v.performance),p=n||w,y=e||L.connected||C.domElement,x=E.useMemo(()=>new Xt(p),[p]);return at(()=>{x.enabled&&x.update()},-1),E.useEffect(()=>(a&&x.connect(a===!0?y:a),x.connect(y),()=>void x.dispose()),[a,y,i,x,h]),E.useEffect(()=>{const v=N=>{h(),i&&U.regress(),m&&m(N)},ee=N=>{r&&r(N)},I=N=>{u&&u(N)};return x.addEventListener("change",v),x.addEventListener("start",ee),x.addEventListener("end",I),()=>{x.removeEventListener("start",ee),x.removeEventListener("end",I),x.removeEventListener("change",v)}},[m,r,u,x,h,D]),E.useEffect(()=>{if(d){const v=O().controls;return j({controls:x}),()=>j({controls:v})}},[d,x]),E.createElement("primitive",fe({ref:f,object:x,enableDamping:o},S))});function tn({scale:d=1}){const{isDark:n}=ot(),i=E.useRef();at(()=>{i.current&&(i.current.rotation.x+=.005,i.current.rotation.y+=.008)});const e=[n?"#FF4757":"#FF6473",n?"#4ECDC4":"#5FD9D1",n?"#FFD166":"#FFE47A",n?"#95E1D3":"#A8E6CC",n?"#F38181":"#FF9999",n?"#AA96DA":"#C9B1FF"];return R.jsx("group",{children:R.jsxs("mesh",{ref:i,scale:d,children:[R.jsx("boxGeometry",{args:[2,2,2]}),R.jsx("meshPhongMaterial",{color:e[0],emissive:e[0],emissiveIntensity:.3}),R.jsx(Jt,{linewidth:2,color:n?"#ffffff":"#000000"})]})})}function rn({scale:d=1,interactive:n=!0}){const{isDark:i}=ot();return R.jsxs(Ft,{style:{width:"100%",height:"100%"},camera:{position:[0,0,3.5],fov:50},gl:{antialias:!0,alpha:!0},children:[R.jsx("fog",{attach:"fog",args:[i?"#0b0b0b":"#f5f5f5",5,15]}),R.jsx("ambientLight",{intensity:.6}),R.jsx("pointLight",{position:[10,10,10],intensity:1}),R.jsx("pointLight",{position:[-10,-10,10],intensity:.8,color:i?"#FF4757":"#FF6473"}),R.jsx(tn,{scale:d}),n&&R.jsx(en,{autoRotate:!0,autoRotateSpeed:4})]})}export{rn as default};
