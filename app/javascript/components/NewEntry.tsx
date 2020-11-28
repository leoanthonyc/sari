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

const NewEntry = (): JSX.Element => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [saveEntry, { loading, error }] = useMutation(SAVE_ENTRY, {
    update(
      cache,
      {
        data: {
          saveEntry: { entry },
        },
      }
    ) {
      cache.modify({
        fields: {
          entries(existingEntries = []) {
            const entryRef = cache.writeFragment({
              data: entry,
              fragment: gql`
                fragment NewEntry on Entry {
                  id
                  name
                  value
                }
              `,
            });
            return [...existingEntries, entryRef];
          },
        },
      });
    },
  });

  const handleSubmit = (): void => {
    saveEntry({ variables: { name, value } });
    setName('');
    setValue('');
  };

  return (
    <div className="new-entry">
      <h2>New Entry</h2>
      {loading && <p>Loading</p>}
      {error && <p>Error</p>}
      Name:
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      Value:
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="button" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default NewEntry;
