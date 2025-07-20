import { useEffect, useState } from "react";
import Icon from "../UI/Icon/Icon";
import style from "./CampersFiltered.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectedCampersByFiltered } from "../../redux/campers/selectors";
import { availableTags } from "../../hooks/tagConfig";
import clsx from "clsx";
import {
  getCampers,
  getCampersByLocation,
} from "../../redux/campers/operations";
import { resetFilters, setFilters } from "../../redux/campers/slice";
import toast from "react-hot-toast";

function CampersFiltered() {
  const dispatch = useDispatch();

  const reduxFilters = useSelector(selectedCampersByFiltered);
  const [selectedFilters, setSelectedFilters] = useState({
    equipment: [],
    transmission: "",
    engine: "",
    form: "",
    location: "",
    page: 1,
    limit: 4,
  });

  useEffect(() => {
    setSelectedFilters(reduxFilters);
  }, [reduxFilters]);

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
    dispatch(setFilters(selectedFilters));

    const query = {};
    const { location, equipment, form, transmission, engine, limit } =
      selectedFilters;

    if (location.trim()) query.location = location.trim();
    if (form) query.form = form;
    if (transmission) query.transmission = transmission;
    if (engine) query.engine = engine;
    if (equipment.length) equipment.forEach((item) => (query[item] = true));

    query.page = 1;
    query.limit = limit || 4;

    dispatch(setFilters({ ...selectedFilters, page: 1 }));

    dispatch(getCampersByLocation(query))
      .unwrap()
      .then((res) => toast.success(`Found ${res.items.length} campers!`))
      .catch(() => toast.error("Failed to load campers."));
  };

  const handleReset = () => {
    const resetValues = {
      equipment: [],
      transmission: "",
      engine: "",
      form: "",
      location: "",
      page: 1,
      limit: 4,
    };

    setSelectedFilters(resetValues);
    dispatch(resetFilters());
    dispatch(getCampers());

    toast.success("Filters reset and all campers loaded.");
  };

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
        {Object.entries(availableTags.transmission.values).map(
          ([subKey, subConfig]) => (
            <li key={`transmission-${subKey}`}>
              <label>
                <input
                  className={style.checkboxTag}
                  type="checkbox"
                  name="transmission"
                  value={subKey}
                  checked={selectedFilters.transmission === subKey}
                  onChange={() => {
                    setSelectedFilters((prev) => ({
                      ...prev,
                      transmission: prev.transmission === subKey ? "" : subKey,
                    }));
                  }}
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
          )
        )}

        {/* Radio для engine */}
        {Object.entries(availableTags.engine.values).map(
          ([subKey, subConfig]) => (
            <li key={`engine-${subKey}`}>
              <label>
                <input
                  className={style.checkboxTag}
                  type="checkbox"
                  name="engine"
                  value={subKey}
                  checked={selectedFilters.engine === subKey}
                  onChange={() => {
                    setSelectedFilters((prev) => ({
                      ...prev,
                      engine: prev.engine === subKey ? "" : subKey,
                    }));
                  }}
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
          )
        )}
        {Object.entries(availableTags)
          .filter(([key]) => key !== "transmission" && key !== "engine")
          .map(([key, config]) => (
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
          ))}
      </ul>
      <h3 className={style.filterVehicle}>Vehicle type</h3>
      <ul className={clsx("scroll", style.filterTagBox)}>
        <li>
          <label>
            <input
              className={style.checkboxTag}
              type="checkbox"
              name="form"
              value="panelTruck"
              checked={selectedFilters.form === "panelTruck"}
              onChange={(e) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  form: e.target.checked ? e.target.value : "",
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
              name="form"
              value="fullyIntegrated"
              checked={selectedFilters.form === "fullyIntegrated"}
              onChange={(e) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  form: e.target.checked ? e.target.value : "",
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
              name="form"
              checked={selectedFilters.form === "alcove"}
              onChange={(e) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  form: e.target.checked ? e.target.value : "",
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
      <div className={style.btnBox}>
        <button type="submit" className={style.btnSearch}>
          Search
        </button>
        <button onClick={handleReset} type="button" className={style.btnReset}>
          Reset
        </button>
      </div>
    </form>
  );
}

export default CampersFiltered;
