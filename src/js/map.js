
const attribution = new ol.control.Attribution({
    collapsible: false,
});

let MapaBase = new ol.layer.Tile({
    source: new ol.source.OSM()

})

let map = new ol.Map({
    target: 'map',
    controls: ol.control.defaults({
        attribution: false
    }).extend([attribution]),
    layers: [MapaBase, layer_Apoyos],
    view: new ol.View({
        center: ol.proj.fromLonLat([-73.1202805, 7.107080]),
        minZoom: 1,
        maxZoom: 20,
        zoom: 19
    })
});

let sidebar = new ol.control.Sidebar({
    element: 'sidebar',
    position: 'left'
});

map.addControl(sidebar);

// Button Control
// Add a custom push button with onToggle function
let hello = new ol.control.Button({
    html: '<i class="fa fa-smile-o"></i>',
    className: "hello",
    title: "Hello world!",
    handleClick: function () {
        showinfo("hello World!");
    }
});
map.addControl(hello);

// Show info
function showinfo(i) {
    console.log(i);
}

map.on('pointermove', function (evt) {
    if (evt.dragging) {
        return;
    }

    // map.getTargetElement().style.cursor = map.hasFeatureAtPixel(event.pixel) ? 'pointer' : '';

    var pixel = map.getEventPixel(evt.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});

function sendMessageToHostApp(json) {
    try {
        if (window.chrome.webview && window.chrome.webview.postMessage) {
            window.chrome.webview.postMessage(json);
        }
    } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
    
}

// load function on load
window.onload = function () {
    // console.log('onload');
    if (window.chrome.webview) {
        window.chrome.webview.addEventListener("message", function (event) {
            // console.log(event.data);
            setGlobarVariables(JSON.parse(event.data));
        });
    }
}

const attribution = new ol.control.Attribution({
    collapsible: false
});

const controlesMapaBase = 
    new ol.control.Zoom({  
      delta: 0.5
    });

const mapaBase = new ol.layer.Tile({ 
    source: new ol.source.OSM() 
    });

const vistaMapaBase = new ol.View({ 
    projection: 'EPSG:3857',
      center: ol.proj.fromLonLat([-73.13, 7.13]),
      minZoom: 1,
      maxZoom: 20,
      zoom: 11
  });

const map = new ol.Map({
    target: 'map',
    layers: [mapaBase,layer_Apoyos],
    view : vistaMapaBase,        
    controls: ol.control.defaults({
        attribution: false,
    }).extend([attribution])
});

map.addControl(controlesMapaBase);

var sidebar = new ol.control.Sidebar({
  element: 'sidebar',
  position: 'left'
});

map.addControl(sidebar);
  
// Button Control
// Add a custom push button with onToggle function
var hello = new ol.control.Button({
  html: '<i class="fa fa-smile-o"></i>',
  className: "hello",
  title: "Hello world!",
  handleClick: function () {
      info("hello World!");
  }
});
map.addControl(hello);

// Show info
function info(i) {
  console.log(i);
}

