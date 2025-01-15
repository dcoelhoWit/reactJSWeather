import "./App.css";
import styled from "styled-components";
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import WeatherForecast from "./components/WeatherForecast";
import WeatherToday from "./components/WeatherToday";
import { formatEpochToUTCDate } from "./utils/DateUtils";

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  color: #fff;
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const Title = styled.h2`
  text-align: center;
  margin: 25px 0;
`;
const SearchInput = styled.input`
  padding: 15px;
  margin: 25px 10px;
  width: 100%;
  font-size: 16px;
  border-radius: 100px;
  border: 1px solid #ccc;
`;
const Nav = styled.nav`
  margin-top: 50px;
  margin-bottom: 25px;
`;
const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  display: flex;
  justify-content: center;
`;
const NavItem = styled.li`
  padding: 10px;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  padding: 10px 20px;
  border: 1px solid white;
  border-radius: 50px;
  background-color: #181a1b;
  color: white;
  &.active {
    background-color: white;
    color: #181a1b;
  }
`;

function App() {
  const [searchValue, setSearchValue] = useState<string>("");

  const [appTitle, setAppTitle] = useState<string>("");
  const [forecasts, setForecasts] = useState<ForecastEntry[]>([]);
  const [groupedForecasts, setGroupedForecasts] = useState<{
    [key: string]: ForecastEntry[];
  }>({});
  const [groupedForecastsIndices, setGroupedForecastsIndices] = useState<
    string[]
  >([]);

  const apiKey = "b9072fabfcea0a52eeabff31f050bffd";
  const unit = "metric";
  const defaultTitle = "Please search for a city";

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=${unit}&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request failed");
        }
        return response.json();
      })
      .then((responseJson: ResponseJson) => {
        updateForecast(responseJson);
      })
      .catch((error) => {
        console.error(
          "There was a problem with the weather fetch operation: ",
          error
        );
        setAppTitle(defaultTitle);
      });
  });

  const updateForecast = (responseJson: ResponseJson) => {
    // Update Title
    const city = responseJson.city;
    if (city !== undefined) {
      setAppTitle("Weather in: " + city.name);
    } else {
      setAppTitle(defaultTitle);
    }

    // Update forecasts
    const list = responseJson.list;
    setForecasts(list);

    groupForecastByDays(forecasts);
  };

  const groupForecastByDays = (forecasts: ForecastEntry[]) => {
    const days: { [key: string]: ForecastEntry[] } = {};
    if (forecasts !== undefined) {
      forecasts.forEach((entry) => {
        const day = formatEpochToUTCDate(entry.dt);
        if (!days[day]) {
          days[day] = [];
        }
        days[day].push(entry);
      });
    }

    setGroupedForecastsIndices(Object.keys(days));
    setGroupedForecasts(days);
  };

  const handleSearchValueUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <AppContainer>
      <Container>
        <Title>{appTitle}</Title>
        <SearchInput
          type="text"
          placeholder="Search city..."
          value={searchValue}
          onChange={handleSearchValueUpdate}
        />
        <Router>
          <Nav>
            <NavList>
              <NavItem>
                <StyledNavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Today's Chart
                </StyledNavLink>
              </NavItem>
              <NavItem>
                <StyledNavLink
                  to="/forecast"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Weather Forecast
                </StyledNavLink>
              </NavItem>
            </NavList>
          </Nav>
          <Routes>
            <Route
              path="/"
              element={
                <WeatherToday
                  groupedForecasts={groupedForecasts}
                ></WeatherToday>
              }
            ></Route>
            <Route
              path="/forecast"
              element={
                <WeatherForecast
                  groupedForecastsIndices={groupedForecastsIndices}
                  groupedForecasts={groupedForecasts}
                ></WeatherForecast>
              }
            ></Route>
          </Routes>
        </Router>
      </Container>
    </AppContainer>
  );
}

export default App;
