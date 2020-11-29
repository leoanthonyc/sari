module Types
  class MutationType < Types::BaseObject
    field :save_entry, mutation: Mutations::SaveEntry
    field :delete_entry, mutation: Mutations::DeleteEntry
  end
end
