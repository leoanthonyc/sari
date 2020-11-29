module Types
  class EntryType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :value, String, null: false
    field :tags, [String], null: true
  end
end
