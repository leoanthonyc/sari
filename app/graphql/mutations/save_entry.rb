module Mutations
  class SaveEntry < Mutations::BaseMutation
    null true

    argument :name, String, required: true
    argument :value, Integer, required: true

    field :entry, Types::EntryType, null: true
    field :errors, [String], null: false

    def resolve(name:, value:)
      user = context[:current_user]
      entry = user.entries.build(name: name, value: value)
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