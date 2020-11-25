module Types
  class MutationType < Types::BaseObject
    field :save_entry, mutation: Mutations::SaveEntry
  end
end
