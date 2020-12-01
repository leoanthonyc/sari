import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import TagsInput from 'react-tagsinput';

const SAVE_ENTRY = gql`
  mutation SaveEntry(
    $id: ID
    $name: String!
    $value: String!
    $tags: [String]
  ) {
    saveEntry(input: { id: $id, name: $name, value: $value, tags: $tags }) {
      entry {
        id
        name
        value
        tags
      }
    }
  }
`;

const DELETE_ENTRY = gql`
  mutation DeleteEntry($id: ID) {
    deleteEntry(input: { id: $id }) {
      success
      errors
    }
  }
`;

type EntryType = {
  id: number;
  name: string;
  value: string;
  tags: string[];
  __ref?: string;
};

const Entry = ({ id, name, value, tags = [] }: EntryType): JSX.Element => {
  const [entryName, setEntryName] = useState(name);
  const [entryValue, setEntryValue] = useState(value);
  const [entryTags, setEntryTags] = useState<string[]>(tags);
  const [isEditing, setIsEditing] = useState(false);
  const [saveEntry, { loading, error }] = useMutation(SAVE_ENTRY);
  const [
    deleteEntry,
    { loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_ENTRY, {
    update(cache) {
      cache.modify({
        fields: {
          entries(existingEntries = []) {
            const deletedEntry = `Entry:${id}`;
            return existingEntries.filter(
              (e: EntryType) => e.__ref !== deletedEntry
            );
          },
        },
      });
    },
  });

  const handleSave = (): void => {
    saveEntry({
      variables: { id, name: entryName, value: entryValue, tags: entryTags },
    });
    setIsEditing(false);
  };

  const handleDelete = (): void => {
    if (confirm('Are you sure?')) {
      deleteEntry({ variables: { id } });
      setIsEditing(false);
    }
  };

  return (
    <div>
      {(loading || loadingDelete) && <p>Loading</p>}
      {(error || errorDelete) && <p>Error</p>}
      Name:
      <input
        disabled={!isEditing}
        type="text"
        value={entryName}
        onChange={(e) => setEntryName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
      />
      Value:
      <input
        disabled={!isEditing}
        type="text"
        value={entryValue}
        onChange={(e) => setEntryValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
      />
      <TagsInput
        disabled={!isEditing}
        value={entryTags}
        onChange={(tags: string[]) => setEntryTags(tags)}
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
        <>
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button type="button" onClick={() => handleDelete()}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Entry;
