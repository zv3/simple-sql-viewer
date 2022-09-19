import {Table} from "./domain/types";

const Tables: Table[] = [
  {
    name: 'global_power_plants',
    url: 'https://global-power-plants.datasettes.com/global-power-plants.json',
    sql: 'select * from [global-power-plants]'
  },
]

export default Tables;
