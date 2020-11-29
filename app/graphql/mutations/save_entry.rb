# frozen_string_literal: true

module Mutations
  # This class handles the creation/update of entries via graphql mutation
  class SaveEntry < Mutations::BaseMutation
    null true

    argument :id, ID, required: false
    argument :name, String, required: true
    argument :value, String, required: true
    argument :tags, String, required: false

    field :entry, Types::EntryType, null: true

    def resolve(id: nil, name:, value:, tags: '')
      user = context[:current_user]
      if id
        entry = user.entries.find(id)
        entry.update(name: name, value: value, tags: tags)
      else
        entry = user.entries.build(name: name, value: value, tags: tags)
      end
      { entry: entry.save ? entry : nil }
    end
  end
end
