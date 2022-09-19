import { QueryResults } from '../domain/types';

const Client = {
  async query(sql: string): Promise<QueryResults> {
    const parsed = await fetch(`${import.meta.env.VITE_BASE_DB_URL}?sql=${sql}`).then((response) =>
      response.json()
    );

    return {
      columns: parsed.columns,
      rows: parsed.rows,
    };
  },
};

export default Client;
