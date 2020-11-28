import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const SAVE_ENTRY = gql`
  mutation SaveEntry($id: ID, $name: String!, $value: String!) {
    saveEntry(input: { id: $id, name: $name, value: $value }) {
      entry {
        id
        name
        value
      }
    }
  }
`;

type EntryType = {
  id: number;
  name: string;
  value: string;
};

const Entry = ({ id, name, value }: EntryType): JSX.Element => {
  const [entryName, setEntryName] = useState(name);
  const [entryValue, setEntryValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [saveEntry, { loading, error }] = useMutation(SAVE_ENTRY);

  const handleSave = (): void => {
    saveEntry({ variables: { id, name: entryName, value: entryValue } });
    setIsEditing(false);
  };

  return (
    <div>
      {loading && <p>Loading</p>}
      {error && <p>Error</p>}
      Name:
      <input
        disabled={!isEditing}
        type="text"
        value={entryName}
        onChange={(e) => setEntryName(e.target.value)}
      />
      Value:
      <input
        disabled={!isEditing}
        type="text"
        value={entryValue}
        onChange={(e) => setEntryValue(e.target.value)}
      />
      {isEditing ? (
        <>
          <button type="button" onClick={() => handleSave()}>
            Save
          </button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}
    </div>
  );
};

export default Entry;
