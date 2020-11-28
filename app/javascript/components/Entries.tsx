import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import Entry from './Entry';
import NewEntry from './NewEntry';

const ENTRIES = gql`
  query Entries {
    entries {
      id
      name
      value
    }
  }
`;

interface Entry {
  id: number;
  name: string;
  value: number;
}

const Entries = (): JSX.Element => {
  const { loading, error, data } = useQuery(ENTRIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { entries } = data;

  return (
    <div className="entries">
      <h1>Entries</h1>
      <NewEntry />
      <h2>Entries</h2>
      {entries.map(({ id, name, value }: Entry) => (
        <div key={id}>
          <Entry id={id} name={name} value={value} />
        </div>
      ))}
    </div>
  );
};

export default Entries;
