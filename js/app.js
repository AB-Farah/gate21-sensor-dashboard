/* global L, SENSORS, SENSOR_TYPE */

const MAP_CENTER = [55.7, 12.4];
const MAP_ZOOM = 10;
const FOCUS_ZOOM = 13;
const INFO_SEEN_KEY = "gate21-info-seen";

const formatNumber = (n) => n.toLocaleString("da-DK");

/** Lille hjælper til at bygge DOM-elementer uden innerHTML. */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/* ---------- Info-dialog ---------- */

function setupInfoModal() {
  const modal = document.getElementById("info-modal");
  const openButton = document.getElementById("open-info");

  openButton.addEventListener("click", () => modal.showModal());

  // Vis kun dialogen automatisk første gang.
  let seen = false;
  try {
    seen = localStorage.getItem(INFO_SEEN_KEY) === "1";
  } catch {
    /* localStorage kan være utilgængelig – så vises dialogen bare */
  }

  if (!seen) modal.showModal();

  modal.addEventListener("close", () => {
    try {
      localStorage.setItem(INFO_SEEN_KEY, "1");
    } catch {
      /* ignorer */
    }
  });
}

/* ---------- Statistik ---------- */

function renderStats(sensors) {
  const total = sensors.reduce((sum, s) => sum + s.peopleCount, 0);
  const busiest = sensors.reduce((a, b) => (b.peopleCount > a.peopleCount ? b : a));

  document.getElementById("stat-sensors").textContent = sensors.length;
  document.getElementById("stat-total").textContent = formatNumber(total);
  document.getElementById("stat-busiest").textContent = busiest.location;
}

/* ---------- Kort og sensorliste ---------- */

function createPopup(sensor) {
  const wrapper = el("div", "popup");
  wrapper.append(
    el("h3", "popup__title", `Sensor ${sensor.id}`),
    el("p", "popup__row", `Type: ${SENSOR_TYPE}`),
    el("p", "popup__row", `Lokation: ${sensor.location}`),
    el("p", "popup__row", `Antal personer: ${formatNumber(sensor.peopleCount)}`),
    el("p", "popup__note", "Målingen tæller personer uanset hvilken retning, de bevæger sig.")
  );
  return wrapper;
}

function setupMap(sensors) {
  const map = L.map("map", { scrollWheelZoom: false }).setView(MAP_CENTER, MAP_ZOOM);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-bidragydere',
  }).addTo(map);

  const list = document.getElementById("sensor-list");
  const buttons = [];

  sensors.forEach((sensor) => {
    const marker = L.marker(sensor.coords, { title: `Sensor ${sensor.id}` })
      .addTo(map)
      .bindPopup(createPopup(sensor));

    const button = el("button", "sensor-item");
    button.type = "button";
    button.append(
      el("span", "sensor-item__name", `Sensor ${sensor.id}`),
      el("span", "sensor-item__meta", `${sensor.location} · ${formatNumber(sensor.peopleCount)} personer målt`)
    );

    const select = () => {
      buttons.forEach((b) => b.classList.toggle("is-active", b === button));
      map.setView(sensor.coords, FOCUS_ZOOM, { animate: true });
      marker.openPopup();
    };

    button.addEventListener("click", select);
    marker.on("click", () => {
      buttons.forEach((b) => b.classList.toggle("is-active", b === button));
    });

    const item = el("li");
    item.append(button);
    list.append(item);
    buttons.push(button);
  });
}

/* ---------- Start ---------- */

document.addEventListener("DOMContentLoaded", () => {
  setupInfoModal();
  renderStats(SENSORS);
  setupMap(SENSORS);
});
