import { 
    Scene, 
    WebGLRenderer,
    PerspectiveCamera,
    BoxGeometry,
    SphereGeometry,
    TetrahedronGeometry,
    PlaneGeometry,
    Mesh,
    MeshBasicMaterial,
    ShadowMaterial,
    DirectionalLight,
    DirectionalLightHelper,
    Color,
    AmbientLight,
    Vector3,
    MathUtils
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const scene = new Scene()
const windowWidth = window.innerWidth
const windowHeight = window.innerHeight
const camera = new PerspectiveCamera( 40, windowWidth / windowWidth, 1, 1000 )
const colorGray = new Color("rgb(170,170,170)")
const renderer = new WebGLRenderer()

const ambientLight = new AmbientLight( 0x333333 );
const light = new DirectionalLight( 0xaabbff, 1.0 );
light.position.set( 0.32, 0.39, 0.7 );

scene.add( light )

renderer.setSize( windowWidth, windowHeight )
document.body.appendChild( renderer.domElement )


const cameraControls = new OrbitControls( camera, renderer.domElement );
cameraControls.addEventListener( 'change', render );


const helper = new DirectionalLightHelper( light, 5 );
scene.add( helper )


// const planeGeometry = new PlaneGeometry( 2000, 2000 );
// planeGeometry.rotateX( - Math.PI / 2 );
// const planeMaterial = new ShadowMaterial( { color:  0x00ff00, opacity: 1 } );
// const plane = new Mesh( planeGeometry, planeMaterial );
// plane.position.y = -200;
// plane.receiveShadow = true;
// scene.add( plane );


const boxGeometry = new BoxGeometry( 1, 1, 1);
const boxMaterial = new MeshBasicMaterial({
    color: "#ccc",
    wireframe: true
});
const box = new Mesh( boxGeometry, boxMaterial );


scene.add( box );
scene.updateMatrixWorld(true);


scene.background = colorGray
camera.position.z = 10;


const selectNode = document.getElementById('select-menu')
const buttonNode = document.getElementById('button')
const inputNode = document.getElementById('input')
const listNode = document.getElementById('list')


buttonNode.onclick = async () => {
    createGeometry(selectNode.value, inputNode.value)
    render()
}

const position = new Vector3();
position.getPositionFromMatrix( box.matrixWorld );


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function createGeometry(type, scale) {
    let xPos = MathUtils.randFloat(-10, -8);
    let zPos = MathUtils.randFloat(-2, 2);
    let yPos = MathUtils.randFloat(-10, -8);
    switch(type) {
        case 'BOX':
            const b = new Mesh(
                new BoxGeometry(), 
                new MeshBasicMaterial({ 
                    color: "#ccc",
                    wireframe: true
                }) 
            )
            b.scale.set(scale, scale, scale)
            b.position.set(xPos, yPos, zPos);
            scene.add(b)
            removeAllChildNodes(listNode);
            list()
            break
        case 'SPHERE':
            const s = new Mesh(
                new SphereGeometry(),
                new MeshBasicMaterial({ 
                    color: "#ccc",
                    wireframe: true
                }) 
            )
            s.scale.set(scale, scale, scale)
            s.position.set(xPos, yPos, zPos);
            scene.add(s)
            removeAllChildNodes(listNode);
            list()
            break
        case 'TETRAHEDRON':
            const t = new Mesh(
                new TetrahedronGeometry(),
                new MeshBasicMaterial({ 
                    color: "#ccc",
                    wireframe: true
                }) 
            )
            t.scale.set(scale, scale, scale)
            t.position.set(xPos, yPos, zPos);
            scene.add(t) 
            removeAllChildNodes(listNode);
            list()
            break   
        default:
            return    
    }
}



function deleteGeometry(uuid) {
    const object = scene.getObjectByProperty('uuid', uuid);

    object.geometry.dispose( )
    object.material.dispose( )
    scene.remove(object);
    render()
}


const list = () => scene.traverse( function( object ) {

    if ( object.isMesh ) {
        const node = document.createElement("li");
        const button = document.createElement("button");
        button.innerHTML = 'X'
        button.setAttribute("id", object.uuid);
        button.onclick = () => deleteGeometry(object.uuid)
        const textnode = document.createTextNode(object.uuid);
        node.appendChild(textnode);
        node.appendChild(button);
        listNode.appendChild(node);
    }
} );

function render() {
    renderer.render( scene, camera );
}


render()
list()