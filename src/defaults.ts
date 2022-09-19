import { Table } from './domain/types';

export const TABLES: Table[] = [
  {
    name: 'global_power_plants',
    url: 'https://global-power-plants.datasettes.com/global-power-plants.json',
    sql: 'select * from [global-power-plants]',
  },
];

export const PREDEFINED_SAVED_QUERIES = [
  {
    name: "Paraguay's power plants",
    description: 'List of existing power plants in Paraguay.',
    sql: 'SELECT rowid, country_long, name, capacity_mw, primary_fuel, commissioning_year, owner, url, year_of_capacity_data, latitude, longitude FROM [global-power-plants] WHERE "country_long" = "Paraguay" ORDER BY rowid LIMIT 101',
    createdAt: 1663562012087,
    id: 'ec993180-9096-41fb-87e5-16eea6c6a618',
  },
  {
    name: 'Largest power plants by MW',
    description: 'Top-10 power plants ordered by their capacity.',
    sql: 'SELECT rowid, country_long, name, capacity_mw, primary_fuel, commissioning_year, owner, url, year_of_capacity_data, latitude, longitude FROM [global-power-plants] ORDER BY capacity_mw DESC LIMIT 10',
    createdAt: 1663565819252,
    id: '6450c5a0-db00-476b-bcb6-f035532a0795',
  },
  {
    name: 'U.S. power plants',
    description: 'List of power plants in the U.S. ordered by capacity.',
    sql: 'SELECT rowid, country_long, name, capacity_mw, primary_fuel, commissioning_year, owner, url, year_of_capacity_data, latitude, longitude FROM [global-power-plants] WHERE "country_long" = "United States of America" ORDER BY capacity_mw DESC LIMIT 101',
    createdAt: 1663567189928,
    id: '2a88c099-d835-404d-98b0-2a87046d949c',
  },
];
