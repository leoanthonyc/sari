module Mutations
  class SaveEntry < Mutations::BaseMutation
    null true

    argument :id, ID, required: false
    argument :name, String, required: true
    argument :value, String, required: true
    argument :tags, String, required: false

    field :entry, Types::EntryType, null: true
    field :errors, [String], null: false

    def resolve(id: nil, name:, value:, tags: '')
      user = context[:current_user]
      if id
        entry = user.entries.find(id)
        entry.update(name: name, value: value, tags: tags)
      else
        entry = user.entries.build(name: name, value: value, tags: tags)
      end
      if entry.save
        # Successful creation, return the created object with no errors
        {
          entry: entry,
          errors: [],
        }
      else
        # Failed save, return the errors to the client
        {
          entry: nil,
          errors: entry.errors.full_messages
        }
      end
    end
  end
end
