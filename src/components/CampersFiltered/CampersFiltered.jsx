import { useState } from "react";
import Icon from "../UI/Icon/Icon";
import style from "./CampersFiltered.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectedCampersByLocation } from "../../redux/campers/selectors";
import { availableTags } from "../../hooks/tagConfig";
import clsx from "clsx";
import { getCampersByLocation } from "../../redux/campers/operations";

function CampersFiltered() {
  const dispatch = useDispatch();

  const [selectedFilters, setSelectedFilters] = useState({
    equipment: [], // kitchen, AC, bathroom, ...
    vehicleType: "",
    location: "", // city
  });

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setSelectedFilters((prev) => {
      const prevValues = prev[name] || [];

      return {
        ...prev,
        [name]: checked
          ? [...prevValues, value]
          : prevValues.filter((v) => v !== value),
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = {};
    const { location, equipment, vehicleType } = selectedFilters;

    // Додаємо location, якщо не порожній
    if (location.trim()) {
      query.location = location.trim();
    }

    // Замість vehicleType — бекенд очікує form
    if (Array.isArray(vehicleType) && vehicleType.length > 0) {
      query.form = vehicleType[0];
    }

    // Розгортаємо equipment: { AC: true, TV: true }
    if (Array.isArray(equipment) && equipment.length > 0) {
      equipment.forEach((item) => {
        query[item] = true;
      });
    }

    console.log("🚀 Final query to dispatch:", query);
    dispatch(getCampersByLocation(query));

    setSelectedFilters({
      equipment: [],
      vehicleType: "",
      location: "",
    });
  };

  const location = useSelector(selectedCampersByLocation);
  console.log("Location", location);

  return (
    <form className={style.filteredWrapper} onSubmit={handleSubmit}>
      <div className={style.locationBox}>
        <label htmlFor="location" className={style.locationTitle}>
          Location
        </label>
        <input
          className={style.locationSearch}
          id="location"
          value={selectedFilters.location}
          type="text"
          placeholder="City"
          onChange={(e) =>
            setSelectedFilters((prev) => ({
              ...prev,
              location: e.target.value,
            }))
          }
        />
        <Icon
          className={style.locationMap}
          height={20}
          width={20}
          name="icon-map"
          stroke={"transparent"}
        />
      </div>
      <h2 className={style.filterTitle}>Filter</h2>
      <h3 className={style.filterVehicle}>Vehicle equipment</h3>
      <ul className={clsx("scroll", style.filterTagBox)}>
        {Object.entries(availableTags).flatMap(([key, config]) => {
          if (config.values) {
            return Object.entries(config.values).map(([subKey, subConfig]) => (
              <li key={`${key}-${subKey}`}>
                <label>
                  <input
                    className={style.checkboxTag}
                    type="checkbox"
                    value={subKey}
                    checked={selectedFilters.equipment.includes(subKey)}
                    name="equipment"
                    onChange={handleFilterChange}
                  />
                  <span className={style.checkboxLabel}>
                    <Icon
                      className={style.iconTag}
                      height={32}
                      width={32}
                      name={subConfig.iconName}
                      stroke="transparent"
                    />
                    {subConfig.label}
                  </span>
                </label>
              </li>
            ));
          }
          return (
            <li key={key}>
              <label>
                <input
                  className={style.checkboxTag}
                  type="checkbox"
                  value={key}
                  checked={selectedFilters.equipment.includes(key)}
                  name="equipment"
                  onChange={handleFilterChange}
                />
                <span className={style.checkboxLabel}>
                  <Icon
                    className={style.iconTag}
                    height={32}
                    width={32}
                    name={config.iconName}
                  />
                  {config.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <h3 className={style.filterVehicle}>Vehicle type</h3>
      <ul className={clsx("scroll", style.filterTagBox)}>
        <li>
          <label>
            <input
              className={style.checkboxTag}
              type="checkbox"
              name="vehicleType"
              value="panelTruck"
              checked={selectedFilters.vehicleType === "panelTruck"}
              onChange={(e) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  vehicleType: e.target.checked ? e.target.value : "",
                }))
              }
            />
            <span className={style.checkboxLabel}>
              <Icon
                className={style.iconTag}
                height={32}
                width={32}
                name="icon-van"
                stroke="transparent"
              />
              Van
            </span>
          </label>
        </li>
        <li>
          <label>
            <input
              className={style.checkboxTag}
              type="checkbox"
              name="vehicleType"
              value="fullyIntegrated"
              checked={selectedFilters.vehicleType === "fullyIntegrated"}
              onChange={(e) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  vehicleType: e.target.checked ? e.target.value : "",
                }))
              }
            />
            <span className={style.checkboxLabel}>
              <Icon
                className={style.iconTag}
                height={32}
                width={32}
                name="icon-Fully"
                stroke="transparent"
              />
              Fully Integrated
            </span>
          </label>
        </li>
        <li>
          <label>
            <input
              className={style.checkboxTag}
              type="checkbox"
              value="alcove"
              name="vehicleType"
              checked={selectedFilters.vehicleType === "alcove"}
              onChange={(e) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  vehicleType: e.target.checked ? e.target.value : "",
                }))
              }
            />
            <span className={style.checkboxLabel}>
              <Icon
                className={style.iconTag}
                height={32}
                width={32}
                name="icon-alcove"
                stroke="transparent"
              />
              Alcove
            </span>
          </label>
        </li>
      </ul>
      <button type="submit" className={style.btnSearch}>
        Search
      </button>
    </form>
  );
}

export default CampersFiltered;
