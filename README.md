# Gate21 · Smart Sensor Overview

A web dashboard prototype that shows **people-counting sensors on an interactive map**, built as a group project at Roskilde University (RUC) with [Gate21](https://www.gate21.dk) as the case.

**🔗 Live demo:** https://ab-farah.github.io/gate21-sensor-dashboard/

> The site is in Danish, and the sensor data is example data.

## The idea

Municipalities want to know where people actually move around, so they can place resources (benches, bins, lighting, maintenance and so on) where they're needed. The sensors in this concept count people walking past using **temperature measurement**, in any direction, without identifying anyone.

The dashboard makes that data easy to read:

- **Interactive map**: every sensor is shown as a marker. Click one to see its location and count.
- **Sensor list**: click a sensor in the list to zoom the map to it.
- **Status overview**: number of active sensors, total people counted and the busiest location, all calculated from the data.
- **Info dialog**: explains how the sensors work on your first visit.

## Built with

- HTML, CSS and vanilla JavaScript (no build step)
- [Leaflet](https://leafletjs.com/) for the map, with tiles from [OpenStreetMap](https://www.openstreetmap.org/)

## Project structure

```
gate21-sensor-dashboard/
├── index.html      # Page structure
├── css/
│   └── styles.css  # All styling
└── js/
    ├── sensors.js  # Sensor data (example data)
    └── app.js      # Map, sensor list, stats and dialog
```

## Run it locally

No installation needed. Clone the repo and open `index.html` in a browser:

```bash
git clone https://github.com/AB-Farah/gate21-sensor-dashboard.git
cd gate21-sensor-dashboard
open index.html   # or just double-click the file
```

To add or change sensors, edit `js/sensors.js`. The map, list and stats update automatically.

## Possible next steps

- Load sensor data from a real API instead of a static file
- Show counts over time (per hour/day) with a chart
- Filter sensors by area or activity level

## Team

Group project at Roskilde University. This repository is a cleaned-up version of the prototype we built together.

- Abdurahman Farah ([@AB-Farah](https://github.com/AB-Farah))
- [@Madsamir](https://github.com/Madsamir)
- [@Dreesmann12](https://github.com/Dreesmann12)

*Not an official Gate21 product.*
