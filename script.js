// Initialiser la carte centrée sur Abidjan
let map = L.map('map').setView([5.338, -4.065], 12); // Vue centrée sur Abidjan

// Ajouter une couche de base OpenStreetMap
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Kdo0PEWQ7WuyzCs1TSss',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        crossOrigin: true
      }).addTo(map);

      //echelle de la carte
L.control.scale({imperial:false}).addTo(map);

// Style des cercles basé sur une propriété
function style(feature) {
    // Exemple : changer de style selon la valeur de la propriété "type"
    if (feature.properties.Qtt === 0) {
        return {
            radius: 5,
            fillColor: "#f5024f",
            color: "#fff",
            weight: 1.5,
            opacity: 1,
            fillOpacity: 1
        };
    } else if (feature.properties.Qtt >= 0) {
        return {
            radius: 6,
            fillColor: "#000",
            color: "#fff",
            weight: 1.5,
            opacity: 1,
            fillOpacity: 1
        };
    } else {
        // Style par défaut 024f47
        return {
            radius: 6,
            fillColor: "#038011",
            color: "#fff",
            weight: 1.5,
            opacity: 1,
            fillOpacity: 1
        };
    }
}

// Charger les fichiers GeoJSON et les ajouter à la carte
fetch('data/coffres.geojson')
.then(response => response.json())
.then(data => {
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, style(feature));
        },
        onEachFeature: function (feature, layer) {
            // Ajouter une popup pour chaque point
            if (feature.properties && feature.properties.Nom) {
                layer.bindPopup(feature.properties.Nom);
            }
        }
    }).addTo(map);
})
.catch(error => console.error('Erreur lors du chargement du fichier GeoJSON:', error));

fetch('data/coffres3.geojson')
.then(response => response.json())
.then(data => {
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, style(feature));
        },
        onEachFeature: function (feature, layer) {
            // Ajouter une popup pour chaque point
            if (feature.properties && feature.properties.Nom) {
                layer.bindPopup(feature.properties.Nom);
            }
        }
    }).addTo(map);
})
.catch(error => console.error('Erreur lors du chargement du fichier GeoJSON:', error));

// afficher-masquer dashboard

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('monBouton').addEventListener('click', function() {
        var element = document.getElementById('side_flottante');
        if (element.classList.contains('collapse')) {
            element.classList.remove('collapse');
        } else {
            element.classList.add('collapse');
        }
    });
});
